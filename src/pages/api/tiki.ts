import type { NextApiRequest, NextApiResponse } from "next";
import type { TikiResponse, ListingResponse } from "@data/api.types";

export default async function Tiki(
  req: NextApiRequest,
  res: NextApiResponse<ListingResponse[]>
) {
  const {
    query: { category, page },
    method,
  } = req;

  switch (method) {
    case "GET":
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

      if (data) {
        // Get data from your database
        res.status(200).json(
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
