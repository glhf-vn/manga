import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import _ from "lodash";

import { Database } from "@data/database.types";

// Create a single supabase client for interacting with your database
const client = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Default the range to current month
const firstDay = DateTime.now().startOf("month").toISODate();
const lastDay = DateTime.now().endOf("month").toISODate();

export async function getEntries(
  start: string = firstDay,
  end: string = lastDay
) {
  const { data, error } = await client
    .from("publication")
    .select()
    .gte("date", start)
    .lte("date", end)
    .order("date", {
      ascending: true,
    })
    .order("name", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  const parsedData = await Promise.all(
    data.map(async (entry) => ({
      ...entry,
      price: entry.price
        ? new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(entry.price)
        : "đang cập nhật",
      publisherLabel: (await getPublisher(entry.publisher)).name,
    }))
  );

  return parsedData;
}

export async function getEntriesByGroup(
  start: string = firstDay,
  end: string = lastDay
) {
  const events = await getEntries(start, end);

  let groupedEvents = _.groupBy(events, (element) => element.date);
  let mappedEvents = _.map(groupedEvents, (entries, date) => {
    return {
      date: date,
      entries: entries,
    };
  });

  return mappedEvents;
}

export async function getLicensed() {
  const { data, error } = await client
    .from("licensed")
    .select()
    .order("publisher", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function getPublisher(query: string) {
  const { data, error } = await client
    .from("publisher")
    .select()
    .eq("id", query)
    .limit(1);

  if (error) {
    throw error;
  }

  return data[0];
}
