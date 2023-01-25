import type { Dispatch, SetStateAction } from "react";
import type { Status } from "./public.types";

export type SeriesProps = {
  filters: {
    publishers: string[];
    types: string[];
    status: Status[];
  };
};

export type FilterProps = {
  title: string;
  values: { id: string; name: string; color: string }[];
  checkedValues: string[];
  handler: Dispatch<SetStateAction<string[]>>;
};
