import type { NextApiRequest, NextApiResponse } from "next";
import type {
  DiscordGuildEventsResponse,
  EventsResponse,
} from "@data/api.types";

export default async function Events(
  req: NextApiRequest,
  res: NextApiResponse<EventsResponse[]>
) {
  if (!process.env.DISCORD_GUILD_ID && !process.env.DISCORD_TOKEN) {
    res.status(503).end();

    throw new Error("DISCORD_GUILD_ID && DISCORD_TOKEN not specified");
  }

  const { method } = req;

  switch (method) {
    case "GET":
      const discordResponse = await fetch(
        `https://discord.com/api/v10/guilds/${process.env
          .DISCORD_GUILD_ID!}/scheduled-events`,
        {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN!}`,
            "Content-Type": "application/json; charset=UTF-8",
          },
          method: "GET",
        }
      );

      const data: DiscordGuildEventsResponse[] = await discordResponse.json();

      if (!discordResponse.ok) {
        console.log(discordResponse.status);

        throw new Error(JSON.stringify(data));
      }

      if (data) {
        // Get data from Discord, also cache on Vercel's network for 1 day
        res.setHeader("Cache-Control", "max-age=0, s-maxage=86400");
        res.status(200).json(
          data.map(
            ({
              description,
              entity_metadata,
              id,
              image,
              name,
              scheduled_end_time,
              scheduled_start_time,
            }) => ({
              description,
              location: entity_metadata.location,
              id,
              image: image
                ? `https://cdn.discordapp.com/guild-events/${id}/${image}.jpg?size=2048`
                : null,
              name,
              scheduled_end_time,
              scheduled_start_time,
            })
          )
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
