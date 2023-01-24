import type {
  Publication,
  PublicationByDate,
  Publisher,
} from "@data/public.types";
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
  options: ModalMethods;
};

export type ReleasesView = {
  releases: PublicationByDate[];
  isLoading: boolean;
  options: ModalMethods;
};

// Modal types

export type ModalMethods = {
  setModalOpen: (value: boolean) => void;
  setModalData: (value: Publication) => void;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export interface InfoModalProps extends ModalProps {
  data: Publication | undefined;
}

export interface FilterModalProps extends ModalProps {
  values: Publisher[];
  statedValues: string[];
  handler: (value: string[]) => void;
}

// Pagination type

export type PaginationProps = {
  date: DateObj;
  options: {
    changeDate: (value: DateObj) => void;
  };
};
