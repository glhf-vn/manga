import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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

const siteList = [
  {
    id: 0,
    name: "Tiki",
    value: "tiki",
    categories: [
      {
        id: 1084,
        name: "Manga",
      },
      {
        id: 7358,
        name: "Light-novel",
      },
    ],
  },
  {
    id: 1,
    name: "FAHASA",
    value: "fahasa",
    categories: [
      {
        id: 6718,
        name: "Manga",
      },
      {
        id: 5981,
        name: "Light-novel",
      },
    ],
  },
];

const fetcher = (url) => fetch(url).then((res) => res.json());

const Products = ({ site, category, page }) => {
  const { data, error } = useSWR(
    `/api/${site}?category=${category}&page=${page}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

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

export default function Listing() {
  const router = useRouter();

  // init
  const [currentSite, changeCurrentSite] = useState(siteList[0]);
  const [currentCategory, changeCurrentCategory] = useState(
    currentSite.categories[0]
  );
  const [currentPage, changeCurrentPage] = useState(1);

  // functions
  const handleSiteChange = (e) => {
    changeCurrentSite(e);
    changeCurrentCategory(e.categories[0]);
    changeCurrentPage(1);
  };

  return (
    <Layout>
      <Header>Thông tin truyện mới</Header>
      <div className="container mx-auto px-6">
        <div className="mb-6 flex items-center gap-3">
          <Listbox
            as="div"
            className="z-10"
            value={currentSite}
            onChange={handleSiteChange}
          >
            <Listbox.Button className="relative flex items-center gap-3 rounded-2xl bg-zinc-200 py-1 px-3">
              {currentSite.name} <BsChevronBarExpand />
            </Listbox.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options className="absolute left-0 mt-3 cursor-default overflow-hidden whitespace-nowrap rounded-2xl bg-zinc-200 shadow-lg">
                {siteList.map((site) => (
                  <Listbox.Option
                    key={site.id}
                    value={site}
                    className="py-1 px-3 transition-colors duration-75 ease-linear ui-selected:bg-primary ui-selected:text-white ui-active:bg-zinc-300"
                  >
                    {site.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
          /
          <Listbox
            as="div"
            className="z-10"
            value={currentCategory}
            onChange={changeCurrentCategory}
          >
            <Listbox.Button className="relative flex items-center gap-3 rounded-2xl bg-zinc-200 py-1 px-3">
              {currentCategory.name} <BsChevronBarExpand />
            </Listbox.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options className="absolute left-0 mt-3 cursor-default overflow-hidden whitespace-nowrap rounded-2xl bg-zinc-200 shadow-lg">
                {currentSite.categories.map((category) => (
                  <Listbox.Option
                    key={category.id}
                    value={category}
                    className="py-1 px-3 transition-colors duration-75 ease-linear ui-selected:bg-primary ui-selected:text-white ui-active:bg-zinc-300"
                  >
                    {category.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
          /<span>{currentPage}</span>
        </div>
        <Products
          site={currentSite.value}
          category={currentCategory.id}
          page={currentPage}
        />
        <ul className="mt-6 flex justify-between">
          {currentPage > 1 && (
            <li className="mr-3">
              <Button onClick={() => changeCurrentPage(currentPage - 1)}>
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
