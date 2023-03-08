import { NextRequest, NextResponse } from "next/server";
import type { HikaruResponse } from "@data/api.types";

export const config = {
  runtime: "edge",
};

export default async function Hikaru(req: NextRequest) {
  const { method } = req;

  switch (method) {
    case "GET":
      const { searchParams } = new URL(req.url);

      const page = searchParams.get("page");

      const fahasaResponse = await fetch(
        `https://apis.haravan.com/com/products.json?page=${page}&limit=24&fields=id,title,images,handle,variants`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.HIKARU_API_KEY}`
          },
          method: "GET",
        }
      );

      const { products }: HikaruResponse = await fahasaResponse.json();

      if (products && products.length > 0) {
        // Get data from your database
        return new NextResponse(
          JSON.stringify(
            // reversed since haravan api's is serving from the bottom up
            products.reverse().map((product) => ({
              id: product.id,
              name: product.title,
              image: product.images[0].src.replace(/.png|.jpeg|.jpg|.webp/, "_large$&"),
              url: `https://www.hikaru.vn/products/${product.handle}`,
              price: product.variants[0].price,
              original_price: product.variants[0].price,
              discount: 0,
            }))
          ),
          {
            status: 200,
            headers: {
              "content-type": "application/json",
            },
          }
        );
      } else {
        return new NextResponse(null, {
          status: 204,
        });
      }
    default:
      return new NextResponse(undefined, {
        status: 405,
      });
  }
}
