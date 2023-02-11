import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";

import type { Database } from "@data/database.types";

import type { Publication } from "@data/public.types";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error("Undefined SUPABASE environment variables");
}

const client = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Default the range to current month
const firstDay = DateTime.now().startOf("month").toISODate();
const lastDay = DateTime.now().endOf("month").toISODate();

export async function getEntries(
  start: string = firstDay,
  end: string = lastDay,
  filter?: {
    publishers?: string | string[];
  },
  order: boolean = true
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
      ascending: order,
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

  return data.map((data) => ({
    ...data,
    image_url: data.image_url ? data.image_url[0] : null,
  })) as Publication[];
}

export async function getEntriesByGroup(
  start: string = firstDay,
  end: string = lastDay,
  filter?: {
    publishers?: string | string[];
  },
  order?: boolean
) {
  type groups = {
    [key: string]: Publication[];
  };

  const events = await getEntries(start, end, filter, order);

  const groupedEvents = events.reduce((events, event) => {
    if (!events[event.date]) {
      events[event.date] = [];
    }
    events[event.date].push(event);

    return events;
  }, {} as groups);

  const groupedEventsArray = Object.keys(groupedEvents).map((date) => {
    return {
      date,
      entries: groupedEvents[date],
    };
  });

  return groupedEventsArray;
}

export async function getType(query: string) {
  const { data, error } = await client
    .from("type")
    .select()
    .eq("id", query)
    .limit(1)
    .single();

  if (error) {
    throw error;
  }

  return data;
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
    .limit(1)
    .single();

  if (error) {
    throw error;
  }

  return data;
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
      licensed(source,image_url,timestamp),
      status
      `
    )
    .eq("id", id)
    .order("date", { foreignTable: "publication", ascending: true })
    .order("name", { foreignTable: "publication", ascending: true })
    .order("edition", {
      foreignTable: "publication",
      ascending: false,
    })
    .limit(1, { foreignTable: "type" })
    .limit(1, { foreignTable: "publisher" })
    .limit(1)
    .single();

  if (error) {
    throw error;
  }

  let publication = data.publication
    ? Array.isArray(data.publication)
      ? data.publication
      : [data.publication]
    : null;
  let licensed = Array.isArray(data.licensed)
    ? data.licensed[0]
    : data.licensed;
  let publisher = Array.isArray(data.publisher)
    ? data.publisher[0]
    : data.publisher;
  let type = Array.isArray(data.type) ? data.type[0] : data.type;

  let image_url: string | null = null;
  let use_loader: boolean = true;

  if (publication && publication.length > 0) {
    if (publication[0].image_url) {
      image_url = publication[0].image_url[0];
      use_loader = true;
    }
  } else {
    if (licensed) {
      image_url = licensed.image_url ?? null;
      use_loader = false;
    }
  }

  return {
    ...data,
    image_url,
    use_loader,
    // handle array cases
    type,
    publisher,
    publication,
    licensed,
  };
}

export async function getSeries(filter?: {
  publishers?: string | string[];
  types?: string | string[];
  status?:
    | Database["public"]["Enums"]["status"]
    | Database["public"]["Enums"]["status"][];
}) {
  let query = client
    .from("series")
    .select(
      `
      *,
      licensed(image_url),
      publication(image_url),
      publisher(id,name),
      type(id,name,color)
      `
    )
    .order("status", { ascending: true })
    .order("publisher", { ascending: true })
    .order("name", { ascending: true })
    .order("name", { ascending: true, foreignTable: "publication" });

  if (filter?.publishers) {
    query = query.in("publisher", [filter.publishers]);
  }

  if (filter?.types) {
    query = query.in("type", [filter.types]);
  }

  if (filter?.status) {
    query = query.in("status", [filter.status]);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data.map((data) => {
    const { publication, licensed, id, name, publisher, type, status } = data;
    let image_url: string | null = null;
    let use_loader: boolean = true;

    if (
      Array.isArray(publication) &&
      publication.length > 0 &&
      publication[0].image_url
    ) {
      // get the first volume cover if exists on publication
      image_url = publication[0].image_url[0];
      use_loader = true;
    } else if (Array.isArray(licensed)) {
      image_url = licensed[0].image_url;
      use_loader = false;
    } else {
      image_url = licensed?.image_url ?? null;
      use_loader = false;
    }

    return {
      id,
      name,
      publisher,
      type,
      status,
      image_url,
      use_loader,
    };
  });
}

export async function getSeriesId() {
  const { data, error } = await client.from("series").select(`id, name`);

  if (error) {
    throw error;
  }

  return data;
}
