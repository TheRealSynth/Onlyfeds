import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";

// Exercise the real component handlers with a small state fixture. This is not
// DOM/browser acceptance: field retention and accessibility are verified there.
const root = process.env.YARDFAME_TEST_ROOT || process.cwd();
const loadDependency = createRequire(path.join(root, "package.json"));
const ts = loadDependency("typescript");
const jsxRuntime = loadDependency("react/jsx-runtime");
type Element = { type: unknown; props: Record<string, unknown> };

function elements(node: unknown): Element[] {
  if (Array.isArray(node)) return node.flatMap(elements);
  if (!node || typeof node !== "object" || !("props" in node)) return [];
  const el = node as Element;
  return [el, ...elements(el.props.children)];
}

function fixture(component: string, replies: Response[]) {
  const states: unknown[] = [];
  const events: unknown[][] = [];
  const requests: { url: string; body: unknown }[] = [];
  let cursor = 0;
  const exports: Record<string, () => unknown> = {};
  const code = ts.transpileModule(
    readFileSync(path.join(root, "src/components/sections", `${component}.tsx`), "utf8"),
    { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } },
  ).outputText;
  vm.runInNewContext(code, {
    exports,
    require(id: string) {
      if (id === "react") return {
        useState(initial: unknown) {
          const index = cursor++;
          if (!(index in states)) states[index] = initial;
          return [states[index], (value: unknown) => { states[index] = value; }];
        },
      };
      if (id === "react/jsx-runtime") return jsxRuntime;
      if (id === "@/components/ui/primitives") return { Container: "div", Section: "section", SectionHeading: "h2" };
      if (id === "@/lib/analytics") return { trackEvent: (...args: unknown[]) => events.push(args) };
      throw new Error(`Unexpected component dependency: ${id}`);
    },
    FormData: class {
      fields: Record<string, string>;
      constructor(fields: Record<string, string>) { this.fields = fields; }
      get(key: string) { return this.fields[key] ?? null; }
    },
    async fetch(url: string, init: { body: string }) {
      requests.push({ url, body: JSON.parse(init.body) });
      const reply = replies.shift();
      assert.ok(reply, "No unexpected submission attempt");
      return reply;
    },
  });
  const render = () => { cursor = 0; return elements(exports[component]()); };
  const form = () => render().find((el) => el.type === "form");
  const fields = { name: "Fixture Person", email: "fixture@example.invalid", role: "Supporter / Fan", stage: "Free World", message: "Keep this draft", alias: "Fixture Alias", background: "Fixture draft" };
  async function submit() {
    const el = form();
    assert.ok(el, "Form remains available for submission");
    await (el.props.onSubmit as (event: unknown) => Promise<void>)({ preventDefault() {}, currentTarget: fields });
  }
  return { states, events, requests, render, form, submit };
}

function reply(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

for (const component of ["Waitlist", "CreatorInterest"]) {
  test(`${component}: an explicitly persisted submission confirms success`, async () => {
    const f = fixture(component, [reply({ ok: true, stored: true }, 201)]);
    await f.submit();
    assert.equal(f.form(), undefined);
    assert.equal(f.states[0], "success");
    assert.equal(f.events.length, 1);
    assert.equal(f.requests.length, 1);
  });

  test(`${component}: unsaved HTTP202 keeps the form retryable and emits no success event`, async () => {
    const f = fixture(component, [reply({ ok: true, stored: false, note: "Fixture-only storage unavailable" }, 202), reply({ ok: true, stored: true })]);
    await f.submit();
    assert.ok(f.form(), "An unrecorded submission must not replace the form with a saved confirmation");
    assert.equal(f.states[0], "error");
    assert.equal(typeof f.states[1], "string");
    assert.equal(f.events.length, 0);
    await f.submit();
    assert.equal(f.states[0], "success");
    assert.equal(f.events.length, 1);
    assert.deepEqual(f.requests[0].body, f.requests[1].body);
  });

  test(`${component}: missing or malformed save confirmation is never accepted`, async () => {
    for (const body of [null, [], {}, { ok: true }, { stored: true }, { ok: "true", stored: true }, { ok: true, stored: "true" }, { ok: false, stored: true }]) {
      const f = fixture(component, [reply(body)]);
      await f.submit();
      assert.ok(f.form(), `Unconfirmed response retains form: ${JSON.stringify(body)}`);
      assert.equal(f.states[0], "error");
      assert.equal(f.events.length, 0);
    }
  });

  test(`${component}: HTTP failure cannot confirm a save or render an object as an error`, async () => {
    const f = fixture(component, [reply({ ok: true, stored: true, error: { private: "fixture-only" } }, 500)]);
    await f.submit();
    assert.ok(f.form());
    assert.equal(f.states[0], "error");
    assert.equal(typeof f.states[1], "string");
    assert.equal(f.events.length, 0);
  });

  test(`${component}: invalid JSON retains a retryable form`, async () => {
    const f = fixture(component, [new Response("{invalid", { status: 200 })]);
    await f.submit();
    assert.ok(f.form());
    assert.equal(f.states[0], "error");
    assert.equal(f.events.length, 0);
  });

  test(`${component}: an already-saved response confirms success once`, async () => {
    const f = fixture(component, [reply({ ok: true, stored: true, note: "Already received." })]);
    await f.submit();
    assert.equal(f.form(), undefined);
    assert.equal(f.states[0], "success");
    assert.equal(f.events.length, 1);
    assert.equal(f.requests.length, 1);
  });
}
