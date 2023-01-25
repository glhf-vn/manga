import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function OG(req: NextRequest) {
  /* Disable image-related eslint because of generating on edge */
  /* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */

  try {
    const { searchParams } = new URL(req.url);

    const interBold = await fetch(
      new URL("../../../../public/fonts/Inter-Bold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    // query
    const title = searchParams.get("title")?.slice(0, 100);

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fafafa",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.2,
            fontFamily: "Inter",
          }}
        >
          <img
            src="https://res.cloudinary.com/glhfvn/image/upload/v1637413794/logo_doaoq7.png"
            height={72}
          />

          <h1 tw="my-6">{title ?? "Đang cập nhật"}</h1>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: interBold,
            weight: 700,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
