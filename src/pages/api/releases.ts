import type { NextApiRequest, NextApiResponse } from "next";
import { getEntriesByGroup } from "@lib/supabase";
import { DateTime } from "luxon";

export default async function Releases(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: {
      start = DateTime.now().startOf("month").toISODate(),
      end = DateTime.now().endOf("month").toISODate(),
      publisher,
      order,
      digital,
    },
    method,
  } = req;

  let parsedOrder = order === "descending" ? false : true;

  let parsedDigital = digital != undefined ? digital === "true" : undefined;

  switch (method) {
    case "GET":
      const entries = await getEntriesByGroup(
        start as string,
        end as string,
        {
          publishers: publisher,
          digital: parsedDigital,
        },
        parsedOrder
      );

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
}
