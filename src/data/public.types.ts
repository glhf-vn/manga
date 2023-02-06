import type { Database } from "@data/database.types";

export type Publisher = Database["public"]["Tables"]["publisher"]["Row"];

export type Publication = Omit<
  Database["public"]["Tables"]["publication"]["Row"],
  "publisher" | "image_url"
> & {
  publisher: Pick<Publisher, "name" | "id">;
  image_url: string;
};

export type PublicationByDate = {
  date: string;
  entries: Publication[];
};

export type Type = Database["public"]["Tables"]["type"]["Row"];

export type Serie = Omit<
  Database["public"]["Tables"]["series"]["Row"],
  "type" | "publisher"
> & {
  type: Type;
  publisher: Pick<Publisher, "name" | "id">;
};

export type Status = Database["public"]["Enums"]["status"];
