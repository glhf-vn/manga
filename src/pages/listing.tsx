import useSWR, { Fetcher } from "swr";
import { useState } from "react";

import Image from "next/image";
import { Listbox, Transition } from "@headlessui/react";
import {
  BsChevronBarExpand,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

import Layout from "@layouts/Layout";

import Card from "@components/Card";
import Badge from "@components/Badge";
import Header from "@components/Header";
import Button from "@components/Button";

import { siteList } from "@data/config";
import type { ListingResponse } from "@data/api.types";

type ListingSetting = {
  site: string;
  category: number;
  page: number;
};

type FilterParams = {
  value: {
    name: string;
  };
  contents: Array<{
    id: number;
    name: string;
  }>;
  onChange: any;
};

const Products = ({ site, category, page }: ListingSetting) => {
  const fetcher: Fetcher<ListingResponse[], string> = (url) =>
    fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    `/api/${site}?category=${category}&page=${page}`,
    fetcher
  );

  if (error) return <div>Đã có lỗi xảy ra, vui lòng thử lại sau</div>;
  if (!data)
    return (
      <div className="grid animate-pulse grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(24)].map((e, i) => (
          <div key={i}>
            <Card>
              <div className="aspect-square h-full w-full bg-zinc-300"></div>
              <div className="p-6 font-bold">
                <div className="h-6 w-full rounded bg-zinc-300"></div>
                <div className="mt-2 h-6 w-full rounded bg-zinc-300"></div>
                <p className="mt-3">
                  <div className="h-4 w-1/2 rounded bg-zinc-300"></div>
                </p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    );

  const currencyFormatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map(({ id, name, url, image, price, original_price, discount }) => (
        <li key={id} className="relative">
          <Card>
            <a href={url} target="_blank" rel="noreferrer">
              {discount != 0 && (
                <div className="absolute top-1 right-1">
                  <Badge intent="success">-{discount}%</Badge>
                </div>
              )}
              <Image
                src={image}
                alt={name}
                width={280}
                height={280}
                unoptimized={true}
                className="h-full w-full"
              />
              <div className="p-6 font-bold">
                <h3>{name}</h3>
                <p className="mt-3">
                  {price < original_price ? (
                    <>
                      <span className="text-green-400">
                        {currencyFormatter.format(price)}
                      </span>{" "}
                      <span className="text-sm text-red-400 line-through">
                        {currencyFormatter.format(original_price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-primary">
                      {currencyFormatter.format(price)}
                    </span>
                  )}
                </p>
              </div>
            </a>
          </Card>
        </li>
      ))}
    </ul>
  );
};

const Filter = ({ value, contents, onChange }: FilterParams) => {
  return (
    <Listbox as="div" className="z-10" value={value} onChange={onChange}>
      <Listbox.Button className="relative flex items-center gap-3 rounded-2xl bg-zinc-200 py-1 px-3 dark:bg-zinc-700">
        {value.name} <BsChevronBarExpand />
      </Listbox.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Listbox.Options className="absolute left-0 mt-3 cursor-default overflow-hidden whitespace-nowrap rounded-2xl bg-zinc-200 shadow-lg dark:bg-zinc-700">
          {contents.map((content: any) => (
            <Listbox.Option
              key={content.id}
              value={content}
              className="py-1 px-3 transition-colors duration-75 ease-linear ui-selected:font-bold ui-active:bg-zinc-300 ui-active:dark:bg-zinc-600"
            >
              {content.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};

export default function Listing() {
  // init
  const [currentSite, changeCurrentSite] = useState(siteList[0]);
  const [currentCategory, changeCurrentCategory] = useState(
    currentSite.categories[0]
  );
  const [currentPage, changeCurrentPage] = useState(1);

  // functions
  const handlePageChange = (page: typeof currentPage) => {
    document.getElementById("__next")?.scrollIntoView({
      behavior: "smooth",
    });
    changeCurrentPage(page);
  };
  const handleCategoryChange = (category: typeof currentCategory) => {
    changeCurrentCategory(category);
    handlePageChange(1);
  };
  const handleSiteChange = (site: typeof currentSite) => {
    changeCurrentSite(site); // change current site to selection
    changeCurrentCategory(site.categories[0]); // change to the 1st category of that selection
    handlePageChange(1); // reset page to 1
  };

  return (
    <Layout>
      <Header>Thông tin truyện mới</Header>
      <div className="container mx-auto px-6">
        <div className="mb-6 flex items-center gap-3">
          <Filter
            value={currentSite}
            onChange={handleSiteChange}
            contents={siteList}
          />
          /
          <Filter
            value={currentCategory}
            onChange={handleCategoryChange}
            contents={currentSite.categories}
          />
          /<span>Trang {currentPage}</span>
        </div>

        <Products
          site={currentSite.value}
          category={currentCategory.id}
          page={currentPage}
        />

        <ul className="mt-6 flex justify-between">
          {currentPage > 1 && (
            <li className="mr-3">
              <Button onClick={() => handlePageChange(currentPage - 1)}>
                <BsChevronLeft /> Trước
              </Button>
            </li>
          )}
          <li className="ml-auto">
            <Button
              intent="primary"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Sau <BsChevronRight />
            </Button>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
