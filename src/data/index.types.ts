import { type getEntriesByGroup } from "@lib/supabase";

export interface MinimalInfo {
  name: string;
  publisherLabel: string;
  price: string;
  date: string;
  image_url: string | null;
  id: string;
  edition: string | null;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface InfoModalProps extends ModalProps {
  data: MinimalInfo;
}

export interface FilterModalProps extends ModalProps {
  values: {
    id: string;
    name: string;
    color: string;
  }[];
  handler: (checked: boolean, filterId: string) => void;
}

export interface SlideProps {
  releases: MinimalInfo[];
}

export interface ReleasesView {
  data: Awaited<ReturnType<typeof getEntriesByGroup>>;
  setModalOpen: (value: boolean) => void;
  setModalData: (value: MinimalInfo) => void;
}
