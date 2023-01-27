export interface DatabaseFilter {
  publishers?: "*" | string;
  types?: "*" | string;
}

// api/fahasa.ts && api/tiki.ts
export type TikiResponse = {
  data?: {
    id: number;
    name: string;
    thumbnail_url: string;
    url_path: string;
    price: number;
    original_price: number;
    discount: number;
  }[];
};

export type FahasaResponse = {
  product_list?: {
    product_id: number;
    product_name: string;
    image_src: string;
    product_url: string;
    product_finalprice: number;
    product_price: number;
    discount: number;
  }[];
};

export type ListingResponse = {
  id: number;
  name: string;
  image: string;
  url: string;
  price: number;
  original_price: number;
  discount: number;
};

// api/events.ts
export type DiscordGuildEventsResponse = {
  description: string;
  entity_metadata: {
    location: string;
  };
  id: string;
  image: string;
  name: string;
  scheduled_end_time: string;
  scheduled_start_time: string;
};

export type EventsResponse = {
  description: string;
  location: string;
  image: string | null;
  name: string;
  scheduled_end_time: string;
  scheduled_start_time: string;
};
