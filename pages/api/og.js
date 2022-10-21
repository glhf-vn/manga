import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

// Make sure the font exists in the specified path:
const font = fetch(
  new URL("../../assets/Kanit-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req) {
  const fontData = await font;

  try {
    const { searchParams } = new URL(req.url);
    const hasName = searchParams.has("name");
    const name = hasName
      ? searchParams.get("name")?.slice(0, 100)
      : "Bìa truyện";

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            fontFamily: '"Kanit"',
            color: "rgb(107, 114, 128)",
            background: "rgb(209, 213, 219)",
            padding: "2.5rem",
            width: "100%",
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span class="text-center text-bold">{name}</span>
        </div>
      ),
      {
        width: 400,
        height: 600,
        fonts: [
          {
            name: "Kanit",
            data: fontData,
            style: "bold",
          },
        ],
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
