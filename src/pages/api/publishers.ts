import type { NextApiRequest, NextApiResponse } from "next";
import { getPublishers } from "@lib/supabase";

export default async function Publishers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      const publishers = await getPublishers();

      if (publishers) {
        // Get data from your database, also cache on Vercel's network for 2 hours
        res.setHeader("Cache-Control", "max-age=0, s-maxage=7200");
        res.status(200).json(publishers);
      } else {
        res.status(204).end();
      }

      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
