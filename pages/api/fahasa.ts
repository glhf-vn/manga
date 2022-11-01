import type { NextApiRequest, NextApiResponse } from "next";

export default async function fahasaHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { category, page },
    method,
  } = req;

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

  const products = await fahasaResponse.json();

  switch (method) {
    case "GET":
      // Get data from your database
      res.status(200).json(
        products.product_list.map((product) => ({
          id: product.product_id,
          name: product.product_name,
          image: product.image_src,
          url: product.product_url,
          price: product.product_finalprice * 1000,
          original_price: product.product_price * 1000,
          discount: product.discount,
        }))
      );
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
