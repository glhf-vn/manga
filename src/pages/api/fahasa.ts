import { NextRequest, NextResponse } from "next/server";
import type { FahasaResponse } from "@data/api.types";

export const config = {
  runtime: "edge",
};

export default async function Fahasa(req: NextRequest) {
  const { method } = req;

  switch (method) {
    case "GET":
      const { searchParams } = new URL(req.url);

      const category = searchParams.get("category");
      const page = searchParams.get("page");

      const fahasaResponse = await fetch(
        `https://fahasa.com/fahasa_catalog/product/loadproducts?category_id=${category}&currentPage=${page}&limit=24&order=created_at&series_type=0`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (X11; Linux x86_64; rv:100.0) Gecko/20100101 Firefox/100.0",
          },
          method: "GET",
        }
      );

      const { product_list }: FahasaResponse = await fahasaResponse.json();

      if (product_list && product_list.length > 0) {
        // Get data from your database
        return new NextResponse(
          JSON.stringify(
            product_list.map((product) => ({
              id: product.product_id,
              name: product.product_name,
              image: product.image_src,
              url: product.product_url,
              price: product.product_finalprice * 1000,
              original_price: product.product_price * 1000,
              discount: product.discount,
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
