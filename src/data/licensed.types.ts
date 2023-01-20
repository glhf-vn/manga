import { Status } from "./public.types";

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
  statedValues: string[];
  handler: (value: string[]) => void;
};
