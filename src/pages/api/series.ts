import type { NextApiRequest, NextApiResponse } from "next";
import { getSeries } from "@lib/supabase";
import { Serie } from "@data/public.types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;

  switch (method) {
    case "GET":
      let entries;

      const { publisher, type } = query;
      const status = query.status as Serie | Serie[] | undefined;

      entries = await getSeries({
        publishers: publisher,
        types: type,
        status: status,
      });

      if (entries) {
        // Get data from your database, also cache on Vercel's network for 2 hours
        res.setHeader("Cache-Control", "max-age=0, s-maxage=7200");
        res.status(200).json(entries);
      } else {
        res.status(204).end();
      }

      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
