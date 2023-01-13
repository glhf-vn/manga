import type { Database } from "@data/database.types";

export type Publisher = Database["public"]["Tables"]["publisher"]["Row"];

export type Publication = Omit<
  Database["public"]["Tables"]["publication"]["Row"],
  "publisher"
> & {
  publisher: Pick<Publisher, "name" | "id">;
};

export type PublicationByDate = {
  date: string;
  entries: Publication[];
};

export type Type = Database["public"]["Tables"]["type"]["Row"];
