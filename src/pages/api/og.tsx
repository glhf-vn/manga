import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const kanit = fetch(
  new URL("../../../public/fonts/Kanit-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const inter = fetch(
  new URL("../../../public/fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const interBold = fetch(
  new URL("../../../public/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const kanitData = await kanit;
    const interData = await inter;
    const interBoldData = await interBold;

    // query
    const name = searchParams.has("name")
      ? searchParams.get("name")?.slice(0, 100)
      : "Đang cập nhật";
    const date = searchParams.has("date")
      ? searchParams.get("date")?.slice(0, 10)
      : "Đang cập nhật";
    const publisher = searchParams.has("publisher")
      ? searchParams.get("publisher")?.slice(0, 100)
      : "Đang cập nhật";
    const price = searchParams.has("price")
      ? searchParams.get("price")?.slice(0, 100)
      : "Đang cập nhật";
    const image_url = searchParams.has("image_url")
      ? searchParams.get("image_url")
      : null;
    const edition = searchParams.has("edition")
      ? searchParams.get("edition")
      : null;

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
            lineHeight: 1.15,
            fontFamily: '"Inter"',
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
              <div
                tw="flex bg-zinc-200 p-6 text-zinc-500 h-[525px] w-[350px] items-center justify-center text-center font-bold text-4xl rounded-3xl shadow-md"
                style={{ fontFamily: '"Kanit"' }}
              >
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
                <span tw="ml-3">Lịch phát hành</span>
              </div>
              <h1 tw="text-5xl mt-6 mb-9" style={{ fontFamily: '"Kanit"' }}>
                {name}
              </h1>
              <span>
                <b style={{ fontFamily: '"Inter Bold"' }}>Ngày phát hành</b>:{" "}
                {date}
              </span>
              {edition && (
                <span tw="mt-3">
                  <b style={{ fontFamily: '"Inter Bold"' }}>Phiên bản</b>: Bản
                  Đặc biệt
                </span>
              )}
              <br tw="mb-9" />

              <span tw="mb-3">
                <b style={{ fontFamily: '"Inter Bold"' }}>
                  Nhà xuất bản/phát hành
                </b>
                : {publisher}
              </span>
              <span>
                <b style={{ fontFamily: '"Inter Bold"' }}>Giá dự kiến</b>:{" "}
                {price}
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
            name: "Kanit",
            data: kanitData,
            style: "normal",
          },
          {
            name: "Inter",
            data: interData,
            style: "normal",
          },
          {
            name: "Inter Bold",
            data: interBoldData,
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
};
