import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090c",
          color: "#f5f4f1",
          fontSize: 96,
          fontWeight: 700,
        }}
      >
        <div style={{ display: "flex" }}>
          Yard<span style={{ color: "#e8b14d" }}>Fame</span>
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#a3a3ab", marginTop: 24 }}>
          Fame Doesn&apos;t Stop at the Fence.
        </div>
      </div>
    ),
    { ...size },
  );
}
