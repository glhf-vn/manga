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

export type Serie = Omit<
  Database["public"]["Tables"]["series"]["Row"],
  "type" | "publisher"
> & {
  type: Pick<Type, "name" | "id">;
  publisher: Pick<Publisher, "name" | "id">;
};

export type Status = Database["public"]["Enums"]["status"];
