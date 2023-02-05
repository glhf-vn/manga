import type { Serie, Status } from "@data/public.types";
import type { InferGetStaticPropsType } from "next";
import type { FilterProps, SeriesProps } from "@data/licensed.types";

import { getPublishers, getTypes } from "@lib/supabase";

import useSWR from "swr";
import { HTMLProps, useState } from "react";

import { Disclosure, Transition } from "@headlessui/react";
import { NextSeo } from "next-seo";
import { BsChevronRight, BsPlus } from "react-icons/bs";
import Link from "next/link";

import Layout from "@layouts/Layout";

import Header from "@components/Header";
import Card from "@components/Card";
import Cover from "@components/Cover";
import Badge from "@components/Badge";
import Button from "@components/Button";

const Filter = ({
  title,
  values,
  checkedValues,
  handler,
  ...props
}: FilterProps & Pick<HTMLProps<HTMLDivElement>, "className">) => {
  const setFilter = (checked: boolean, filterId: string) => {
    if (!checked) {
      // if uncheck
      handler(checkedValues.filter((value) => value != filterId)); //remove filterId from array
    } else {
      handler([...checkedValues, filterId]); // add filterId to array
    }
  };

  return (
    <Disclosure as="div" {...props}>
      {({ open }) => (
        <>
          <Disclosure.Button className="mb-3 flex w-full items-center justify-between">
            <span>{title}</span>
            <BsPlus
              className={`text-2xl transition-transform duration-100 ${
                open ? "rotate-45 transform" : ""
              }`}
            />
          </Disclosure.Button>
          <Transition
            show={open}
            enter="transition-all duration-300 ease-out"
            enterFrom="transform -translate-y-6 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition-all duration-200 ease-out"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-6 opacity-0"
          >
            <Disclosure.Panel className="space-y-1">
              {values.map((value) => (
                <div key={value.id} className="flex items-center">
                  <input
                    id={`${value.id}`}
                    checked={checkedValues.includes(value.id)}
                    style={{ color: value.color }}
                    type="checkbox"
                    className={`h-4 w-4 rounded border-gray-300 text-primary transition-all focus:ring-primary`}
                    onChange={({ target }) =>
                      setFilter(target.checked, value.id)
                    }
                  />
                  <label
                    htmlFor={`${value.id}`}
                    className="ml-3 text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    {value.name}
                  </label>
                </div>
              ))}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

const useSeries = (
  publishers?: string[],
  types?: string[],
  status?: Status[]
) => {
  const { data, error, isLoading } = useSWR(
    {
      publishers,
      types,
      status,
    },
    async ({ publishers, types, status }) => {
      let url = `/api/series?`;

      publishers?.map((publisher) => (url += `&publisher=${publisher}`));
      types?.map((type) => (url += `&type=${type}`));
      status?.map((status) => (url += `&status=${status}`));

      return await fetch(url).then((res) => res.json());
    }
  );

  return {
    series: data as (Serie & { image_url: string | null })[],
    isLoading,
    isError: error,
  };
};

const Series = ({ filters }: SeriesProps) => {
  const { publishers, types, status } = filters;

  const { series, isLoading, isError } = useSeries(publishers, types, status);

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

  if (!isLoading && series.length == 0)
    return (
      <div className="container mx-auto mt-12 flex items-center justify-center px-3">
        <div className="text-center">
          <p>{"~(>_<~)"}</p>
          <h1 className="my-3 font-kanit text-4xl font-bold">
            Không tìm thấy!
          </h1>
          <p>Bộ lọc của bạn đã lỡ tay... lọc hết! Thử lại nhé.</p>
        </div>
      </div>
    );

  if (isLoading) {
    return (
      <ul className="grid animate-pulse grid-cols-1 gap-6 md:grid-cols-2">
        {[...Array(8)].map((_, i) => (
          <li key={i}>
            <Card>
              <div className="grid grid-cols-3">
                <div className="col-span-1">
                  <div className="h-[200px] w-full bg-zinc-400 dark:bg-zinc-600"></div>
                </div>
                <div className="relative col-span-2 flex flex-col justify-between">
                  <div className="p-6">
                    <div className="mb-3 h-5 w-12 rounded bg-zinc-400 dark:bg-zinc-600"></div>
                    <div className="h-6 w-full rounded bg-zinc-400 dark:bg-zinc-600"></div>
                  </div>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {series.map((serie) => (
        <li key={serie.id}>
          <Link href={`/license/${serie.id}`}>
            <Card>
              <div className="grid grid-cols-3">
                <div className="col-span-1">
                  <Cover useLoader={false} entry={serie} fit="full" />
                </div>
                <div className="relative col-span-2 flex flex-col justify-between">
                  <div className="absolute top-1 right-1">
                    <Badge style={{ backgroundColor: serie.type.color }}>
                      {serie.type.name}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <span className="text-sm">{serie.publisher.name}</span>
                    <h3 className="font-kanit text-2xl">{serie.name}</h3>
                  </div>
                  <span className="flex items-center justify-end gap-2 p-3 text-sm text-zinc-600 dark:border-zinc-600 dark:text-zinc-200">
                    Chi tiết <BsChevronRight className="inline-block" />
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps = async () => {
  const publishers = await getPublishers();
  const types = await getTypes();

  return {
    props: {
      publishers,
      types,
    },
    revalidate: 600, // revalidate every 10 minutes
  };
};

export default function SeriesList({
  publishers,
  types,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const status = [
    {
      id: "Licensed",
      name: "Đã mua bản quyền",
      color: "#f8b60b",
    },
    { id: "Published", name: "Đã ra mắt", color: "#f8b60b" },
    { id: "Finished", name: "Đã hoàn thành", color: "#f8b60b" },
  ];
  const [filterPublishers, changeFilterPublishers] = useState<string[]>([]);

  const [filterTypes, changeFilterTypes] = useState(
    types.map((type) => type.id)
  );

  const [filterStatus, changeFilterStatus] = useState(["Licensed"]);

  const [filters, changeFilters] = useState({
    publishers: filterPublishers,
    types: filterTypes,
    status: filterStatus as Status[],
  });

  return (
    <Layout>
      <NextSeo
        title="Thông tin bản quyền"
        description="Xem thông tin manga/light-novel được mua bản quyền, cập nhật thường xuyên!"
        openGraph={{
          title: `Thông tin bản quyền`,
          description: `Xem thông tin manga/light-novel được mua bản quyền, cập nhật thường xuyên!`,
          images: [
            {
              url: encodeURI(
                "https://manga.glhf.vn/api/og/?title=Thông tin bản quyền manga/LN"
              ),
              width: 1200,
              height: 630,
              alt: "Thông tin bản quyền",
            },
          ],
        }}
      />

      <Header>Thông tin bản quyền</Header>

      <div className="container mx-auto flex flex-col gap-6 px-6 md:flex-row-reverse">
        <div className="basis-56 lg:basis-72">
          <h2 className="font-kanit text-2xl">Bộ lọc</h2>

          <Filter
            title="Trạng thái"
            values={status}
            checkedValues={filterStatus}
            handler={changeFilterStatus}
            className="mt-6"
          />

          <Filter
            title="Loại truyện"
            values={types}
            checkedValues={filterTypes}
            handler={changeFilterTypes}
            className="mt-6"
          />

          <Filter
            title="Nhà xuất bản"
            values={publishers}
            checkedValues={filterPublishers}
            handler={changeFilterPublishers}
            className="mt-6"
          />

          <Button
            intent="primary"
            className="mt-6 w-full font-bold"
            onClick={() =>
              changeFilters({
                publishers: filterPublishers,
                types: filterTypes,
                status: filterStatus as Status[],
              })
            }
          >
            Lọc
          </Button>
        </div>
        <div className="flex-1">
          <Series filters={filters} />
        </div>
      </div>
    </Layout>
  );
}
