import { getEntries, getEntriesByGroup, getPublishers } from "@lib/supabase";

import type { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { useState } from "react";
import { DateTime } from "luxon";

import { Dialog, Menu, Transition } from "@headlessui/react";
import { NextSeo } from "next-seo";
import {
  BsChevronDown,
  BsBoxArrowUp,
  BsChevronCompactLeft,
  BsChevronCompactRight,
  BsFilter,
} from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";

import Layout from "@layouts/Layout";

import Card from "@components/Card";
import Button from "@components/Button";
import Badge from "@components/Badge";
import Cover from "@components/Cover";
import Modal from "@components/Modal";

import "@splidejs/react-splide/css/core";

interface MinimalInfo {
  name: string;
  publisherLabel: string;
  price: string;
  date: string;
  image_url: string | null;
  id: string;
  edition: string | null;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InfoModalProps extends ModalProps {
  data: MinimalInfo;
}

interface FilterModalProps extends ModalProps {
  values: {
    id: string;
    name: string;
    color: string;
  }[];
  handler: (checked: boolean, filterId: string) => void;
}

interface SlideProps {
  releases: MinimalInfo[];
}

const ReleasesSlide = ({ releases }: SlideProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bottom-[30%] bg-zinc-100 shadow-[inset_0_0_1rem_0_rgba(0,0,0,0.1)] dark:bg-zinc-900"></div>
      <Splide
        hasTrack={false}
        options={{
          autoplay: true,
          interval: 5000,
          rewind: true,
          pagination: false,
          speed: 500,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          breakpoints: {
            640: {
              arrows: false,
              padding: "1.5rem",
              gap: "1rem",
            },
          },
        }}
        className="pt-20 sm:pt-6"
      >
        <div className="block px-6 sm:hidden">
          <span className="font-kanit text-3xl font-bold">Phát hành</span>
        </div>
        <SplideTrack>
          {releases.map((release) => {
            return (
              <SplideSlide key={release.id}>
                <div className="container mx-auto flex flex-col-reverse gap-6 pb-12 sm:flex-row sm:gap-12 sm:px-6">
                  <div className="cursor-default overflow-hidden rounded-2xl shadow-md transition-all ease-in-out hover:shadow-lg sm:basis-72">
                    <Cover
                      entry={release}
                      hero={true}
                      sizes="(max-width: 768px) 80vw, (max-width: 1024px) 25vw, 15vw"
                    />
                  </div>
                  <div className="sm:flex-1 sm:pt-20">
                    <span className="hidden sm:inline">Phát hành </span>
                    <span className="text-xl sm:text-base">
                      <span className="capitalize">
                        {DateTime.fromISO(release.date)
                          .setLocale("vi")
                          .toFormat("EEEE, D")}
                      </span>
                    </span>
                    <h2 className="mt-3 mb-6 hidden font-kanit text-4xl font-bold sm:block">
                      {release.name}
                    </h2>
                    <p className="hidden sm:block">
                      <b>Nhà xuất bản/phát hành</b>: {release.publisherLabel}
                      <br />
                      <b>Giá dự kiến</b>: {release.price}
                    </p>
                  </div>
                </div>
              </SplideSlide>
            );
          })}
        </SplideTrack>

        <div className="splide__arrows absolute top-1/2 left-0 right-0 mx-6 flex -translate-y-1/2 transform justify-between">
          <button className="splide__arrow splide__arrow--prev text-4xl text-zinc-500">
            <BsChevronCompactLeft />
          </button>
          <button className="splide__arrow splide__arrow--next text-4xl text-zinc-500">
            <BsChevronCompactRight />
          </button>
        </div>

        <div className="splide__progress absolute top-[75%] left-0 right-0 -z-10 hidden sm:block">
          <div className="splide__progress__bar h-1 bg-primary" />
        </div>
      </Splide>
    </div>
  );
};

const MonthSelect = () => {
  const lastMonth = DateTime.now().minus({ month: 1 });
  const thisMonth = DateTime.now();
  const nextMonth = DateTime.now().plus({ month: 1 });

  const router = useRouter();
  const path = router.query;

  const pagedMonth = isEmpty(path) ? thisMonth.get("month") : path.month;

  return (
    <div className="z-10 flex items-center gap-3 font-kanit text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
      <span>Lịch phát hành</span>
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center gap-3 rounded-2xl bg-zinc-200 py-1 px-2 dark:bg-zinc-700">
          tháng {pagedMonth}
          <BsChevronDown className="text-sm" />
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="absolute right-0 mt-3 w-full overflow-hidden rounded-2xl bg-zinc-200 shadow-lg dark:bg-zinc-700">
            <Menu.Item>
              <Link
                className="transition-color block py-1 px-2 duration-75 ease-linear ui-active:bg-zinc-300 ui-active:dark:bg-zinc-600"
                href={`/archive/${lastMonth.get("year")}/${lastMonth.get(
                  "month"
                )}`}
              >
                {lastMonth.setLocale("vi").toFormat("MMMM")}
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                className="transition-color block py-1 px-2 duration-75 ease-linear ui-active:bg-zinc-300 ui-active:dark:bg-zinc-600"
                href={`/`}
              >
                {thisMonth.setLocale("vi").toFormat("MMMM")}
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                className="transition-color block py-1 px-2 duration-75 ease-linear ui-active:bg-zinc-300 ui-active:dark:bg-zinc-600"
                href={`/archive/${nextMonth.get("year")}/${nextMonth.get(
                  "month"
                )}`}
              >
                {nextMonth.setLocale("vi").toFormat("MMMM")}
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

const FilterModal = ({
  isOpen,
  onClose,
  values,
  handler,
}: FilterModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <Dialog.Title className="m-6 font-kanit text-2xl font-bold lg:text-3xl">
          Lọc theo nhà xuất bản/phát hành
        </Dialog.Title>
        {/* TODO: Filter */}
        <Dialog.Description className="m-6 space-y-1">
          {values.map((value) => (
            <div key={value.id} className="flex items-center">
              <input
                id={`${value.id}`}
                defaultChecked={true}
                type="checkbox"
                className={`h-4 w-4 rounded border-gray-300 text-primary transition-all focus:ring-primary`}
                onChange={({ target }) => handler(target.checked, value.id)}
              />
              <label
                htmlFor={`${value.id}`}
                className="ml-3 text-sm text-gray-600"
              >
                {value.name}
              </label>
            </div>
          ))}
        </Dialog.Description>
      </div>
    </Modal>
  );
};

const InfoModal = ({ isOpen, onClose, data }: InfoModalProps) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        const fetchURL = `/api/og?name=${encodeURIComponent(
          data.name
        )}&date=${encodeURIComponent(data.date)}&publisher=${
          data.publisherLabel
        }&price=${data.price}${
          data.image_url != null ? `&image_url=${data.image_url}` : ""
        }${data.edition != null ? `&edition=${data.edition}` : ""}`;
        const response = await fetch(fetchURL);
        const blob = await response.blob();
        const shareImage = [
          new File([blob], `${data.name}.jpg`, {
            type: "image/jpeg",
            lastModified: new Date().getTime(),
          }),
        ];

        await navigator.share({
          title: data.name,
          files: shareImage,
        });
      } catch (error) {
        console.log(`An error occured with sharing module: ${error}`);
      }
    } else {
      // fallback code
      console.log(
        "Web share is currently not supported on this browser. Please provide a callback"
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:max-w-[250px]">
          <Cover
            entry={data}
            sizes="(max-width: 768px) 80vw, (max-width: 1024px) 25vw, 15vw"
            fit="full"
          />
        </div>
        <div className="flex-1 p-6 sm:pt-9">
          <div className="flex h-full flex-col justify-between">
            <div>
              <Dialog.Title className="mb-3 font-kanit text-2xl font-bold lg:text-3xl">
                {data.name}
              </Dialog.Title>
              <Dialog.Description>
                <b>Ngày phát hành</b>:{" "}
                {DateTime.fromISO(data.date)
                  .setLocale("vi")
                  .toLocaleString(DateTime.DATE_SHORT)}
                <br />
                {data.edition && (
                  <>
                    <b>Phiên bản</b>: {data.edition}
                    <br />
                  </>
                )}
                <br />
                <b>Nhà xuất bản/phát hành</b>: {data.publisherLabel}
                <br />
                <b>Giá dự kiến</b>: {data.price}
              </Dialog.Description>
            </div>
            <div className="mt-6">
              <div className="mt-1 flex gap-2">
                {/* TODO: hide button on unsupported browser */}
                <Button onClick={handleShare} intent="secondary">
                  <BsBoxArrowUp className="h-[20px] w-[20px]" />
                </Button>
                <Button className="bg-[#c92127] text-zinc-50">
                  <a
                    href={`https://fahasa.com/catalogsearch/result/?q=${data.name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src="/img/fahasa-logo.png"
                      alt="FAHASA"
                      width={107}
                      height={20}
                    />
                  </a>
                </Button>
                <Button className="bg-[#1a94ff] text-zinc-50">
                  <a
                    href={`https://tiki.vn/search?q=${data.name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src="/img/tiki-logo.png"
                      alt="Tiki"
                      width={30}
                      height={20}
                    />
                  </a>
                </Button>
                <Button className="bg-[#ff6633] text-zinc-50">
                  <a
                    href={`https://shopee.vn/search?keyword=${data.name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src="/img/shopee-logo.png"
                      alt="Shopee"
                      width={59}
                      height={20}
                    />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export const getStaticProps = async () => {
  const releases = await getEntriesByGroup();

  const slideReleases = await getEntries(
    DateTime.now().toISODate(),
    DateTime.now().plus({ days: 3 }).toISODate()
  );

  const publishers = await getPublishers();

  return {
    props: {
      publishers,
      releases,
      slideReleases,
    },
    revalidate: 600,
  };
};

export const Releases = ({
  publishers,
  releases,
  slideReleases,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // Set the open state & data for the modal
  const [modalData, setModalData] = useState<MinimalInfo>({
    name: "mangaGLHF",
    publisherLabel: "đang cập nhật",
    price: "đang cập nhật",
    date: DateTime.now().toISODate(),
    image_url: null,
    id: "default",
    edition: null,
  });
  const [filterPublishers, changeFilterPublishers] = useState(
    publishers.map((publisher) => publisher.id)
  );

  const toggleFilterPublishers = (checked: boolean, filterId: string) => {
    if (!checked) {
      // if uncheck
      changeFilterPublishers(
        filterPublishers.filter((publisher) => publisher != filterId)
      ); //remove filterId from array
    } else {
      changeFilterPublishers([...filterPublishers, filterId]); // add filterId to array
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  releases = releases.map(({ date, entries }) => ({
    date: date,
    entries: entries.filter(({ publisher }) =>
      filterPublishers.includes(publisher)
    ),
  }));

  return (
    <Layout>
      <NextSeo
        title="Lịch phát hành"
        description="Xem lịch phát hành chưa bao giờ là dễ hơn, nay được tổng hợp từ nhiều NXB khác nhau!"
      />

      <InfoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={modalData}
      />

      <FilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        values={publishers}
        handler={toggleFilterPublishers}
      />

      <ReleasesSlide releases={slideReleases} />

      <div className="container mx-auto px-6">
        <div className="flex justify-between">
          <MonthSelect />
          <Button
            className="rounded-2xl px-2 text-xl sm:text-2xl lg:text-3xl"
            onClick={() => setFilterOpen(!filterOpen)}
            aria-label="Mở bộ lọc"
            intent="secondary"
          >
            <BsFilter />
          </Button>
        </div>

        {releases.map((releaseDate) => {
          let date = DateTime.fromISO(releaseDate.date).setLocale("vi");
          let today = DateTime.now();

          return (
            <div key={date.valueOf()}>
              <div className={`mt-12 mb-3 flex items-center text-xl font-bold`}>
                <span className="capitalize">
                  {date.toFormat("EEEE - dd/MM")}
                </span>
                {date < today && <Badge intent="success">Đã phát hành!</Badge>}
              </div>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
                {releaseDate.entries.map((release) => {
                  return (
                    <Card
                      onClick={() => {
                        setModalData(release);
                        setModalOpen(true);
                      }}
                      key={release.id}
                      clickable={true}
                      entry={release}
                      cardSize={release.wide ? "wide" : "normal"}
                    >
                      {release.edition && (
                        <Badge className="absolute top-0 right-0 bg-amber-200/75 backdrop-blur-md">
                          {release.edition}
                        </Badge>
                      )}
                      <Cover
                        entry={release}
                        sizes="(max-width: 768px) 40vw, 200px"
                      />
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default function Home({
  publishers,
  releases,
  slideReleases,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Releases
      publishers={publishers}
      releases={releases}
      slideReleases={slideReleases}
    />
  );
}
