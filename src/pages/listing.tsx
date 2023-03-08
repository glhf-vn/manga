import useSWR, { Fetcher } from "swr";
import { useState, useEffect } from "react";

import Image from "next/image";
import { Listbox, Transition } from "@headlessui/react";
import {
  BsChevronBarExpand,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { NextSeo } from "next-seo";

import Layout from "@layouts/Layout";

import Card from "@components/Card";
import Badge from "@components/Badge";
import Header from "@components/Header";
import Button from "@components/Button";

import { siteList, VND } from "@data/config";
import type { ListingResponse } from "@data/api.types";

type ListingSetting = {
  site: string;
  category: string | number;
  page: number;
};

type FilterParams = {
  value: {
    name: string;
  };
  contents: Array<{
    id: string | number;
    name: string;
  }>;
  onChange: (e: any) => void;
};

const Products = ({ site, category, page }: ListingSetting) => {
  const fetcher: Fetcher<ListingResponse[], string> = (url) =>
    fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/api/${site}?category=${category}&page=${page}`,
    fetcher
  );

  if (error) return <div>Đã có lỗi xảy ra, vui lòng thử lại sau</div>;
  if (isLoading)
    return (
      <div className="grid animate-pulse grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(24)].map((e, i) => (
          <div key={i}>
            <Card>
              <div className="aspect-square h-full w-full bg-zinc-300 dark:bg-zinc-700"></div>
              <div className="p-6">
                <div className="h-6 w-full rounded bg-zinc-300 dark:bg-zinc-700"></div>
                <div className="mt-2 h-6 w-full rounded bg-zinc-300 dark:bg-zinc-700"></div>
                <p className="mt-3">
                  <div className="h-4 w-1/2 rounded bg-zinc-300 dark:bg-zinc-700"></div>
                </p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    );

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data!.map(
        ({ id, name, url, image, price, original_price, discount }) => (
          <li key={id} className="relative">
            <Card>
              <a href={url} target="_blank" rel="noreferrer">
                {discount != 0 && (
                  <div className="absolute top-2 right-2">
                    <Badge intent="success">-{discount}%</Badge>
                  </div>
                )}
                <Image
                  src={image}
                  alt={name}
                  width={280}
                  height={280}
                  unoptimized
                  className="h-full w-full"
                />
                <div className="p-6 font-bold">
                  <h3>{name}</h3>
                  <p className="mt-3">
                    {price < original_price ? (
                      <>
                        <span className="text-green-400">
                          {VND.format(price)}
                        </span>{" "}
                        <span className="text-sm text-red-400 line-through">
                          {VND.format(original_price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-primary">{VND.format(price)}</span>
                    )}
                  </p>
                </div>
              </a>
            </Card>
          </li>
        )
      )}
    </ul>
  );
};

const Filter = ({ value, contents, onChange }: FilterParams) => {
  return (
    <Listbox as="div" value={value} onChange={onChange}>
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // functions
  const handleCategoryChange = (category: typeof currentCategory) => {
    changeCurrentCategory(category);
    changeCurrentPage(1);
  };

  const handleSiteChange = (site: typeof currentSite) => {
    changeCurrentSite(site); // change current site to selection
    changeCurrentCategory(site.categories[0]); // change to the 1st category of that selection
    changeCurrentPage(1); // reset page to 1
  };

  return (
    <Layout>
      <NextSeo
        title="Thông tin truyện mới"
        description="Xem thông tin truyện manga/light-novel mới ra mắt từ các trang TMĐT!"
        openGraph={{
          title: `Thông tin truyện mới`,
          description: `Xem thông tin truyện manga/light-novel mới ra mắt từ các trang TMĐT!`,
          images: [
            {
              url: encodeURI(
                "https://manga.glhf.vn/api/og/?title=Thông tin truyện mới"
              ),
              width: 1200,
              height: 630,
              alt: "Thông tin truyện mới",
            },
          ],
        }}
      />

      <Header>Thông tin truyện mới</Header>

      <div className="sticky top-0 z-10 bg-zinc-50/75 pb-6 pt-20 backdrop-blur-md dark:bg-zinc-800/75 sm:pt-6">
        <div className="container mx-auto flex items-center gap-3 px-6">
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
      </div>

      <div className="container mx-auto px-6">
        <Products
          site={currentSite.value}
          category={currentCategory.id}
          page={currentPage}
        />

        {/* preload next page */}
        <div style={{ display: "none" }}>
          <Products
            site={currentSite.value}
            category={currentCategory.id}
            page={currentPage + 1}
          />
        </div>

        <ul className="mt-6 flex justify-between">
          {currentPage > 1 && (
            <li className="mr-3">
              <Button
                intent="secondary"
                onClick={() => changeCurrentPage(currentPage - 1)}
              >
                <BsChevronLeft /> Trước
              </Button>
            </li>
          )}
          <li className="ml-auto">
            <Button
              intent="primary"
              onClick={() => changeCurrentPage(currentPage + 1)}
            >
              Sau <BsChevronRight />
            </Button>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
