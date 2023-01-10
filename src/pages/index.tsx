import type { InferGetStaticPropsType } from "next";
import type {
  MinimalInfo,
  SlideProps,
  FilterModalProps,
  InfoModalProps,
  ReleasesView,
} from "@data/index.types";

import { getEntries, getEntriesByGroup, getPublishers } from "@lib/supabase";

import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { useState } from "react";
import { DateTime } from "luxon";

import { Dialog, Menu, Switch, Transition } from "@headlessui/react";
import { NextSeo } from "next-seo";
import {
  BsBoxArrowUp,
  BsBoxArrowUpRight,
  BsCalendar2CheckFill,
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsChevronCompactLeft,
  BsChevronCompactRight,
  BsFilter,
  BsFillGridFill,
  BsListUl,
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
                        {DateTime.fromISO(release.date).toFormat("EEEE, D")}
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

        <div className="splide__progress absolute top-[70%] left-0 right-0 -z-10 hidden sm:block">
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
    <div className="z-10 flex items-center gap-3 font-kanit text-2xl font-bold">
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
                {lastMonth.toFormat("MMMM")}
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                className="transition-color block py-1 px-2 duration-75 ease-linear ui-active:bg-zinc-300 ui-active:dark:bg-zinc-600"
                href={`/`}
              >
                {thisMonth.toFormat("MMMM")}
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                className="transition-color block py-1 px-2 duration-75 ease-linear ui-active:bg-zinc-300 ui-active:dark:bg-zinc-600"
                href={`/archive/${nextMonth.get("year")}/${nextMonth.get(
                  "month"
                )}`}
              >
                {nextMonth.toFormat("MMMM")}
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

const Pagination = () => {
  const router = useRouter();
  const params = router.query;

  const year: number = params?.year ? +params.year : DateTime.now().year;
  const month: number = params?.month ? +params.month : DateTime.now().month;

  const pagedTime = DateTime.fromObject({
    year: year,
    month: month,
  });

  const lastMonth = pagedTime.minus({ month: 1 });
  const nextMonth = pagedTime.plus({ month: 1 });

  return (
    <div className="flex justify-between">
      <Button intent="secondary">
        <Link
          className="flex items-center justify-center gap-3"
          href={`/archive/${lastMonth.year}/${lastMonth.month}`}
        >
          <BsChevronLeft /> Trước
        </Link>
      </Button>

      <Button intent="primary">
        <Link
          className="flex items-center justify-center gap-3"
          href={`/archive/${nextMonth.year}/${nextMonth.month}`}
        >
          Sau <BsChevronRight />
        </Link>
      </Button>
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
                className="ml-3 text-sm text-zinc-600 dark:text-zinc-400"
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
                {DateTime.fromISO(data.date).toLocaleString(
                  DateTime.DATE_SHORT
                )}
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

const CardView = ({ setModalOpen, setModalData, data }: ReleasesView) => (
  <>
    {data.map((releaseDate) => {
      let date = DateTime.fromISO(releaseDate.date);
      let today = DateTime.now();

      return (
        <div className="container mx-auto px-6" key={date.valueOf()}>
          <div className={`mt-12 mb-3 flex items-center text-xl font-bold`}>
            <span className="capitalize">{date.toFormat("EEEE - dd/MM")}</span>
            {date < today && <Badge intent="success">Đã phát hành!</Badge>}
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
            {releaseDate.entries.map((release) => (
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
                <Cover entry={release} sizes="(max-width: 768px) 40vw, 200px" />
              </Card>
            ))}
          </div>
        </div>
      );
    })}
  </>
);

const ListView = ({ setModalOpen, setModalData, data }: ReleasesView) => (
  <div className="mx-auto overflow-scroll lg:container">
    <div className="min-w-fit px-6">
      <div className="mt-12 grid min-w-max grid-cols-6 overflow-hidden rounded-2xl border dark:border-zinc-600">
        <span className="border-r p-3 text-center font-bold dark:border-zinc-600 dark:bg-zinc-700">
          Ngày phát hành
        </span>
        <span className="col-span-4 p-3 font-bold dark:bg-zinc-700">Tên</span>
        <span className="p-3 font-bold dark:bg-zinc-700">Giá</span>
        {data.map((releaseDate) => {
          const date = DateTime.fromISO(releaseDate.date);
          const today = DateTime.now();

          return (
            <>
              <div
                className="flex h-full items-center justify-center border-t border-r p-3 font-bold dark:border-zinc-600"
                style={{
                  gridRow: `span ${releaseDate.entries.length} / span ${releaseDate.entries.length}`,
                }}
              >
                <span>{date.toFormat("dd/MM/yyyy")}</span>
                {date < today && (
                  <BsCalendar2CheckFill className="ml-3 inline-block align-baseline text-green-200" />
                )}
              </div>
              {releaseDate.entries.map((release) => (
                <>
                  <div
                    className="col-span-4 flex cursor-pointer items-center gap-3 border-t p-3 decoration-primary decoration-2 hover:underline dark:border-zinc-600"
                    onClick={() => {
                      setModalData(release);
                      setModalOpen(true);
                    }}
                  >
                    <span className="">{release.name}</span>
                    {release.edition && (
                      <Badge className="m-0 bg-amber-200/75 backdrop-blur-md">
                        {release.edition}
                      </Badge>
                    )}
                    <BsBoxArrowUpRight className="inline-block text-zinc-400" />
                  </div>
                  <span className="border-t p-3 dark:border-zinc-600">
                    {release.price}
                  </span>
                </>
              ))}
            </>
          );
        })}
      </div>
    </div>
  </div>
);

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

  const [view, toggleView] = useState(true); // true = card, false = list

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
        <div className="flex flex-col justify-between gap-6 sm:flex-row">
          <MonthSelect />
          <div className="grid grid-cols-2 gap-6 sm:flex">
            <Button
              className="rounded-2xl px-2 text-xl sm:text-2xl lg:text-3xl"
              onClick={() => setFilterOpen(!filterOpen)}
              aria-label="Mở bộ lọc"
              intent="secondary"
            >
              <BsFilter />
            </Button>
            <Switch
              checked={view}
              onChange={toggleView}
              className="relative overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-700"
            >
              <span className="sr-only">Thay đổi layout</span>
              <div
                className={`${
                  view ? "translate-x-0" : "translate-x-full"
                } absolute top-0 h-full w-1/2 transform bg-primary transition-transform duration-200 ease-in-out`}
              ></div>
              <div className="relative grid w-full grid-cols-2 items-center">
                <span className="flex h-full items-center justify-center px-3">
                  <BsFillGridFill />
                </span>
                <span className="flex h-full items-center justify-center px-3">
                  <BsListUl />
                </span>
              </div>
            </Switch>
          </div>
        </div>
      </div>

      {view ? (
        <CardView
          setModalOpen={setModalOpen}
          setModalData={setModalData}
          data={releases}
        />
      ) : (
        <ListView
          setModalOpen={setModalOpen}
          setModalData={setModalData}
          data={releases}
        />
      )}

      <div className="container mx-auto mt-12 px-6">
        <Pagination />
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
