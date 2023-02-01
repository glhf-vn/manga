import { NextRequest, NextResponse } from "next/server";
import type { TikiResponse } from "@data/api.types";

export const config = {
  runtime: "edge",
};

export default async function Tiki(req: NextRequest) {
  const { method } = req;

  switch (method) {
    case "GET":
      const { searchParams } = new URL(req.url);

      const category = searchParams.get("category");
      const page = searchParams.get("page");

      const tikiResponse = await fetch(
        `https://tiki.vn/api/personalish/v1/blocks/listings?limit=24&category=${category}&page=${page}&sort=newest&seller=1`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (X11; Linux x86_64; rv:100.0) Gecko/20100101 Firefox/100.0",
          },
          method: "GET",
        }
      );

      const { data }: TikiResponse = await tikiResponse.json();

      if (data && data.length > 0) {
        // Get data from your database
        return new NextResponse(
          JSON.stringify(
            data.map((product) => ({
              id: product.id,
              name: product.name,
              image: product.thumbnail_url,
              url: `https://tiki.vn/${product.url_path}`,
              price: product.price,
              original_price: product.original_price,
              discount: Math.round(
                (product.discount / product.original_price) * 100
              ),
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
