import type { InferGetStaticPropsType } from "next";
import type { ReleasesProps, DateObj } from "@data/index.types";
import type { Publication, PublicationByDate } from "@data/public.types";

import { getEntries, getPublishers } from "@lib/supabase";

import { useContext, useEffect, useState } from "react";
import { DateTime } from "luxon";
import useSWR from "swr";

import { NextSeo } from "next-seo";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";

import Layout from "@layouts/Layout";

import { ViewContext, ViewProvider } from "@components/index/ViewProvider";

import { ListView, GridView } from "@components/index/View";
import Slideshow from "@components/index/Slideshow";
import Pagination from "@components/index/Pagination";
import MonthPicker from "@components/index/MonthPicker";
import ChangeView from "@components/index/ChangeView";

import FilterModal from "@components/index/FilterModal";
import InfoModal from "@components/index/InfoModal";

import Button from "@components/Button";

const useReleases = (
  year = DateTime.now().year,
  month = DateTime.now().month,
  order: boolean,
  publishers?: string[]
) => {
  const { data, error, isLoading } = useSWR(
    { url: `/api/releases`, args: { year, month, order, publishers } },
    async ({ url, args }) => {
      const { year, month, publishers, order } = args;
      const dateObj = DateTime.fromObject({ year, month });

      return await fetch(
        `${url}?start=${dateObj.startOf("month").toISODate()}&end=${dateObj
          .endOf("month")
          .toISODate()}&order=${order ? "ascending" : "descending"}&${publishers
          ?.map((publisher) => `publisher=${publisher}`)
          .join("&")}`
      ).then((res) => res.json());
    }
  );

  return {
    releases: data as PublicationByDate[],
    isLoading,
    isError: error,
  };
};

const Releases = ({ date, filters, order, options }: ReleasesProps) => {
  const view = useContext(ViewContext);

  const { year, month } = date;
  const { publishers } = filters;
  const { setNearest } = options;

  const { releases, isLoading, isError } = useReleases(
    year,
    month,
    order,
    publishers
  );

  if (isError)
    return (
      <div className="container mx-auto mt-12 flex items-center justify-center px-3">
        <div className="text-center">
          <p>{"＼(º □ º l|l)/"}</p>
          <h1 className="my-3 font-kanit text-4xl font-bold">Nani?</h1>
          <p>
            Chuyện kỳ quái gì đã xảy ra. Vui lòng tải lại trang hoặc liên hệ bọn
            mình nhé.
          </p>
        </div>
      </div>
    );

  if (!isLoading && releases.length == 0)
    return (
      <div className="container mx-auto mt-12 flex items-center justify-center px-3">
        <div className="text-center">
          <p>{"~(>_<~)"}</p>
          <h1 className="my-3 font-kanit text-4xl font-bold">
            Không tìm thấy!
          </h1>
          <p>Có thể lịch phát hành tháng này chưa có, quay lại sau nhé!</p>
        </div>
      </div>
    );

  if (!isLoading) {
    for (const group of releases) {
      const date = DateTime.fromISO(group.date);
      const today = DateTime.now();

      if (date.month == today.month && date.day >= today.day) {
        setNearest(date.toISODate());
        break;
      }
    }
  }

  if (view == 1)
    return (
      <GridView isLoading={isLoading} options={options} releases={releases} />
    );
  else
    return (
      <ListView isLoading={isLoading} options={options} releases={releases} />
    );
};

export const getStaticProps = async () => {
  const now = DateTime.now();

  const upcoming = await getEntries(
    now.toISODate(),
    now.plus({ days: 3 }).toISODate()
  );

  const publishers = await getPublishers();

  return {
    props: {
      publishers,
      upcoming,
    },
    revalidate: 600, // revalidate every 10 minutes
  };
};

export default function Home({
  publishers,
  upcoming,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const now = DateTime.now();

  // date states
  const [currentDate, changeDate] = useState<DateObj>({
    year: now.year,
    month: now.month,
  });

  const [nearest, setNearest] = useState<string>("");

  // modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Publication | undefined>();

  const [filterPublishers, changeFilterPublishers] = useState<string[]>([]);

  // order states
  const [currentOrder, setCurrentOrder] = useState(true); // true = ascending, false = descending

  // load state if persist on browser
  useEffect(() => {
    const view = window.localStorage.getItem("RELEASES_VIEW");
    const order = window.localStorage.getItem("RELEASES_ORDER");
    if (order !== null) setCurrentOrder(JSON.parse(order));
  }, []);
  // save to browser
  useEffect(() => {
    window.localStorage.setItem("RELEASES_ORDER", JSON.stringify(currentOrder));
  }, [currentOrder]);

  const jumpToNearest = () => {
    if (currentDate.year != now.year || currentDate.month != now.month)
      changeDate({ year: now.year, month: now.month });

    document.getElementById(nearest)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout>
      <NextSeo
        title="Lịch phát hành manga/light-novel"
        description="Xem lịch phát hành manga/light-novel từ NXB Kim Đồng, NXB Trẻ, IPM và các công ty phát hành khác."
        openGraph={{
          title: `Lịch phát hành manga/light-novel`,
          description: `Xem lịch phát hành manga/light-novel từ các nhà xuất bản.`,
          images: [
            {
              url: encodeURI(
                "https://manga.glhf.vn/api/og/?title=Lịch phát hành"
              ),
              width: 1200,
              height: 630,
              alt: "Lịch phát hành",
            },
          ],
        }}
      />

      <InfoModal
        data={modalData}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <Slideshow data={upcoming} />

      <ViewProvider>
        <div className="relative z-10 w-full bg-zinc-50 py-4 backdrop-blur-md dark:bg-zinc-800/75 lg:sticky lg:top-0">
          <div className="container mx-auto flex flex-col gap-6 px-6 md:flex-row md:justify-between">
            <div>
              <span className="inline font-kanit text-2xl font-bold">
                Lịch phát hành
              </span>{" "}
              <MonthPicker date={currentDate} options={{ changeDate }} />
            </div>
            <div className="flex gap-3">
              <button
                className="rounded-2xl bg-zinc-200 py-1 px-3 text-lg transition-all duration-150 ease-linear hover:bg-zinc-300 disabled:cursor-default disabled:text-zinc-500 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                onClick={jumpToNearest}
                aria-label="Đến gần nhất"
                role="button"
              >
                Gần nhất
              </button>
              <Button
                className="flex-1 text-2xl"
                onClick={() => setCurrentOrder((order) => !order)}
                aria-label="Đổi thứ tự"
                role="button"
                intent="secondary"
              >
                {currentOrder ? <BsArrowDownShort /> : <BsArrowUpShort />}
              </Button>
              <FilterModal
                values={publishers}
                checkedValues={filterPublishers}
                handler={changeFilterPublishers}
              />
              <ChangeView />
            </div>
          </div>
        </div>

        <Releases
          date={currentDate}
          filters={{ publishers: filterPublishers }}
          order={currentOrder}
          options={{ setModalOpen, setModalData, setNearest }}
        />
      </ViewProvider>

      <div className="container mx-auto mt-12 px-6">
        <Pagination date={currentDate} options={{ changeDate }} />
      </div>
    </Layout>
  );
}
