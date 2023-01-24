import type { NextApiRequest, NextApiResponse } from "next";
import type { FahasaResponse, ListingResponse } from "@data/api.types";

export default async function Fahasa(
  req: NextApiRequest,
  res: NextApiResponse<ListingResponse[]>
) {
  const {
    query: { category, page },
    method,
  } = req;

  switch (method) {
    case "GET":
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

      if (product_list) {
        // Get data from your database
        res.status(200).json(
          product_list.map((product) => ({
            id: product.product_id,
            name: product.product_name,
            image: product.image_src,
            url: product.product_url,
            price: product.product_finalprice * 1000,
            original_price: product.product_price * 1000,
            discount: product.discount,
          }))
        );
      } else {
        res.status(204).end();
      }

      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
