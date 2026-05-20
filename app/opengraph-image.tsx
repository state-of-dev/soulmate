/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og"

export const alt = "Soulmate"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#000",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "88px",
          width: "100%",
        }}
      >
        <img
          src="https://soulmate-sh.vercel.app/logo-navbar.png"
          alt="Soulmate"
          style={{
            maxHeight: "260px",
            maxWidth: "980px",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    size
  )
}
