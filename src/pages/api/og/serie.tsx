import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function SerieOG(req: NextRequest) {
  /* Disable image-related eslint because of generating on edge */
  /* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */

  try {
    const { searchParams } = new URL(req.url);

    const inter = await fetch(
      new URL("../../../../public/fonts/Inter-Regular.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());
    const interBold = await fetch(
      new URL("../../../../public/fonts/Inter-Bold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    // query
    const name = searchParams.get("name")?.slice(0, 100) ?? "Đang cập nhật";
    const publisher =
      searchParams.get("publisher")?.slice(0, 100) ?? "Đang cập nhật";
    const image_url = searchParams.get("image_url") ?? null;
    const type = searchParams.get("type") ?? "Đang cập nhật";
    const status = parseInt(searchParams.get("status") || "1");

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
            fontSize: 28,
            fontWeight: 400,
            lineHeight: 1.2,
            fontFamily: "Inter",
          }}
        >
          <img
            src="https://res.cloudinary.com/glhfvn/image/upload/v1670311284/glhfoverlay_xz1ygb.png"
            width={400}
            tw="absolute bottom-0 right-0"
          />
          <div tw="flex p-12 h-full w-full">
            {image_url ? (
              <div tw="flex h-[525px] w-[350px] rounded-3xl shadow-md overflow-hidden">
                <img
                  tw="h-full w-full"
                  style={{ objectFit: "cover" }}
                  src={image_url}
                />
              </div>
            ) : (
              <div tw="flex font-bold bg-zinc-200 p-6 text-zinc-500 h-[525px] w-[350px] items-center justify-center text-center font-bold text-4xl rounded-3xl shadow-md">
                {name}
              </div>
            )}
            <div tw="flex flex-col ml-12 flex-1">
              <div
                tw="flex text-zinc-500 text-6 mt-3"
                style={{ alignItems: "center" }}
              >
                <img
                  src="https://res.cloudinary.com/glhfvn/image/upload/v1637413794/logo_doaoq7.png"
                  height={32}
                />
                <span tw="ml-3">/</span>
                <span tw="ml-3">Thông tin bản quyền</span>
              </div>

              <h1 tw="text-5xl my-6 font-bold leading-snug">{name}</h1>

              <span tw="mb-3">
                <b>Nhà xuất bản</b>: {publisher}
              </span>
              <span tw="mb-6">
                <b>Tình trạng</b>:{" "}
                {status == 1
                  ? "Đã mua bản quyền"
                  : status == 2
                  ? "Đã ra mắt"
                  : "Đã hoàn thành"}
              </span>
              <span>
                <span
                  tw="px-3 py-1.5 rounded-full text-base"
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#f8b60b",
                  }}
                >
                  {type}
                </span>
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: inter,
            weight: 400,
            style: "normal",
          },
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
