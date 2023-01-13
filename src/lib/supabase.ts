import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import _ from "lodash";

import type { Database } from "@data/database.types";
import { ServerResponse } from "http";
import { DatabaseFilter } from "@data/api.types";

import type { Publication } from "@data/public.types";

// Create a single supabase client for interacting with your database
const client = createClient<Database>(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

// Default the range to current month
const firstDay = DateTime.now().startOf("month").toISODate();
const lastDay = DateTime.now().endOf("month").toISODate();

export async function getEntries(
  start: string = firstDay,
  end: string = lastDay,
  filter?: {
    publishers?: string | string[];
  }
) {
  let query = client
    .from("publication")
    .select(
      `*,
      publisher(id,name)`
    )
    .gte("date", start)
    .lte("date", end)
    .order("date", {
      ascending: true,
    })
    .order("wide", {
      ascending: false,
    })
    .order("name", {
      ascending: true,
    })
    .order("edition", {
      ascending: false,
    });

  if (filter?.publishers) {
    query = query.in("publisher", [filter.publishers]);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data as Publication[];
}

export async function getEntriesByGroup(
  start: string = firstDay,
  end: string = lastDay,
  filter?: {
    publishers?: string | string[];
  }
) {
  const events = await getEntries(start, end, filter);

  let groupedEvents = _.groupBy(events, (element) => element.date);
  let mappedEvents = _.map(groupedEvents, (entries, date) => {
    return {
      date,
      entries,
    };
  });

  return mappedEvents;
}

export async function getEntriesById(id: number, count?: number) {
  const response = client
    .from("publication")
    .select()
    .eq("serie_id", id)
    .order("date", {
      ascending: true,
    })
    .order("edition", {
      ascending: false,
    });

  const { data } = count ? await response.limit(count) : await response;

  return data!;
}

export async function getLicensedInfo(id: number) {
  const { data, error } = await client
    .from("licensed")
    .select()
    .eq("serie_id", id)
    .limit(1);

  if (error) {
    throw error;
  }

  return data;
}

export async function getLicensed() {
  const { data, error } = await client
    .from("licensed")
    .select()
    .order("timestamp", {
      ascending: false,
    })
    .order("publisher", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  const parsedData = await Promise.all(
    data.map(async (entry) => {
      return {
        ...entry,
        publisherLabel:
          (await getPublisher(entry.publisher)).name || "đang cập nhật",
      };
    })
  );

  return parsedData;
}

export async function getType(query: string) {
  const { data, error } = await client
    .from("type")
    .select()
    .eq("id", query)
    .limit(1);

  if (error) {
    throw error;
  }

  return data[0];
}

export async function getTypes() {
  const { data, error } = await client.from("type").select();

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

export async function getPublishers() {
  const { data, error } = await client.from("publisher").select();

  if (error) {
    throw error;
  }

  return data;
}

export async function getSerie(id: number) {
  const { data, error } = await client
    .from("series")
    .select(
      `
    id,
    name,
    anilist,
    type(*),
    publisher(*),
    publication(id,name,edition,price,image_url,date),
    licensed(source,image_url,timestamp)
    `
    )
    .eq("id", id)
    .limit(1, { foreignTable: "type" })
    .limit(1)
    .single();

  if (error) {
    throw error;
  }

  return {
    ...data,
    // handle array cases
    type: Array.isArray(data.type) ? data.type[0] : data.type,
    publisher: Array.isArray(data.publisher)
      ? data.publisher[0]
      : data.publisher,
    publication: data.publication
      ? Array.isArray(data.publication)
        ? data.publication
        : [data.publication]
      : null,
    licensed: Array.isArray(data.licensed) ? data.licensed[0] : data.licensed,
  };
}

export async function getSeries() {
  const { data, error } = await client.from("series").select(`
    *,
    publisher(name),
    publication(id,name,edition,price,image_url,date),
    licensed(name,source,image_url)
  `);

  if (error) {
    throw error;
  }

  return data;
}

export async function getSeriesId() {
  const { data, error } = await client.from("series").select(`id`);

  if (error) {
    throw error;
  }

  return data;
}
