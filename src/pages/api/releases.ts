import type { NextApiRequest, NextApiResponse } from "next";
import { getEntriesByGroup } from "@lib/supabase";
import { DateTime } from "luxon";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {
      start = DateTime.now().startOf("month").toISODate(),
      end = DateTime.now().endOf("month").toISODate(),
      publisher,
      type,
    },
    method,
  } = req;

  switch (method) {
    case "GET":
      const entries = await getEntriesByGroup(start as string, end as string, {
        publishers: publisher,
      });

      if (entries) {
        // Get data from your database
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
