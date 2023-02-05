import { NextRequest, NextResponse } from "next/server";
import type { DiscordGuildEventsResponse } from "@data/api.types";

export const config = {
  runtime: "edge",
};

export default async function Events(req: NextRequest) {
  if (!process.env.DISCORD_GUILD_ID && !process.env.DISCORD_TOKEN) {
    return new NextResponse(null, { status: 503 });
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

      if (!discordResponse.ok) {
        return new NextResponse(null, { status: discordResponse.status });
      }

      const data: DiscordGuildEventsResponse[] = await discordResponse.json();

      if (data) {
        // Get data from Discord, also cache on Vercel's network for 1 day
        return new NextResponse(
          JSON.stringify(
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
          ),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              "Cache-Control": "max-age=0, s-maxage=86400",
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
