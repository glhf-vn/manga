import type {
  Publication,
  PublicationByDate,
  Publisher,
} from "@data/public.types";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import type { MonthNumbers } from "luxon";

export type DateObj = {
  year: number;
  month: MonthNumbers;
};

// Slider type

export interface SliderProps {
  data: Publication[];
}

// Publication types

export type ReleasesProps = {
  date: DateObj;
  view: boolean;
  filters: {
    publishers: string[];
  };
  order: boolean;
  options: ModalMethods & {
    setNearest: Dispatch<SetStateAction<string>>;
  };
};

export type ReleasesView = {
  releases: PublicationByDate[];
  isLoading: boolean;
  options: ModalMethods;
};

// Modal types

export type ModalMethods = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalData: Dispatch<SetStateAction<Publication | undefined>>;
};

export type ModalProps = {
  isOpen: boolean;
  onClose(): void;
};

export interface InfoModalProps extends ModalProps {
  data: Publication | undefined;
}

export interface FilterModalProps extends ModalProps {
  values: Publisher[];
  checkedValues: string[];
  handler: Dispatch<SetStateAction<string[]>>;
}

// Pagination type

export type PaginationProps = {
  date: DateObj;
  options: {
    changeDate: Dispatch<SetStateAction<DateObj>>;
  };
};
