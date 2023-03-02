import type { Series } from "@data/public.types";
import type { Hit } from "instantsearch.js";
import type { InferGetStaticPropsType } from "next";

import slug from "slug";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

import { Disclosure, Transition } from "@headlessui/react";
import { NextSeo } from "next-seo";
import { BsChevronRight, BsPlus } from "react-icons/bs";
import Link from "next/link";
import {
  InstantSearch,
  Hits,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  SortBy,
  SearchBox,
} from "react-instantsearch-hooks-web";

import Layout from "@layouts/Layout";

import Header from "@components/Header";
import Card from "@components/Card";
import Cover from "@components/Cover";
import Badge from "@components/Badge";

const refinementListClass = {
  list: "space-y-1",
  label: "flex items-center",
  checkbox:
    "h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary transition-all focus:ring-primary bg-zinc-50 dark:bg-zinc-800",
  labelText: "ml-3 text-sm text-zinc-600 dark:text-zinc-400",
  count:
    "ml-1 text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-200 dark:bg-zinc-700 px-1.5 py-0.5 rounded-full",
};

const hitsClass = {
  list: "grid grid-cols-1 gap-6 md:grid-cols-2",
};

const paginationClass = {
  list: "flex gap-2 items-center justify-center",
  item: "transition-all duration-150 ease-linear rounded-xl hover:bg-zinc-300 dark:hover:bg-zinc-600",
  selectedItem: "font-bold bg-primary",
  disabledItem: "cursor-not-allowed",
  link: "text-sm py-1.5 px-3 block",
};

const highlightClass = {
  highlighted: "bg-primary",
};

const searchClass = {
  root: "mb-6 relative",
  form: "flex",
  reset: "absolute top-0 right-0 h-full px-3",
  input:
    "flex-1 rounded-2xl bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-100 border-zinc-200 dark:border-zinc-600",
};

const sortByClass = {
  select:
    "w-full rounded-2xl bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-100 border-zinc-200 dark:border-zinc-600",
};

const HitComponent = ({ hit }: { hit: Hit<Series[0]> }) => (
  <Link href={`/license/${hit.id}/${slug(hit.name)}`}>
    <Card>
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <Cover entry={hit} fit="full" />
        </div>
        <div className="relative col-span-2 flex flex-col justify-between">
          <div className="absolute top-2 right-2">
            <Badge style={{ backgroundColor: hit.type.color }}>
              {hit.type.name}
            </Badge>
          </div>
          <div className="p-6">
            <span className="text-sm">{hit.publisher.name}</span>
            <h3 className="font-kanit text-2xl">
              <Highlight
                classNames={highlightClass}
                attribute="name"
                hit={hit}
              />
            </h3>
            <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-200">
              Trạng thái: {hit.status}
            </div>
          </div>
          <span className="flex items-center justify-end gap-2 p-3 text-sm text-zinc-600 dark:border-zinc-600 dark:text-zinc-200">
            Chi tiết <BsChevronRight className="inline-block" />
          </span>
        </div>
      </div>
    </Card>
  </Link>
);

export default function SeriesList() {
  if (
    !process.env.NEXT_PUBLIC_MEILI_SEARCH_URL ||
    !process.env.NEXT_PUBLIC_MEILI_SEARCH_KEY
  ) {
    throw new Error(
      "MEILI_SEARCH_URL and/or MEILI_SEARCH_KEY environment variable not found"
    );
  }

  const meili_url = process.env.NEXT_PUBLIC_MEILI_SEARCH_URL;
  const meili_key = process.env.NEXT_PUBLIC_MEILI_SEARCH_KEY;

  const searchClient = instantMeiliSearch(meili_url, meili_key, {
    finitePagination: true,
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

      <InstantSearch
        searchClient={searchClient}
        indexName="series:timestamp:desc"
      >
        <Configure hitsPerPage={10} />
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-6 md:flex-row-reverse">
            <div className="basis-56 lg:basis-72">
              <div className="top-6 space-y-3 sm:sticky">
                <h3 className="font-kanit text-2xl">Sắp xếp</h3>

                <SortBy
                  items={[
                    { label: "Mới nhất", value: "series:timestamp:desc" },
                    { label: "Cũ nhất", value: "series:timestamp:asc" },
                    { label: "Tên (A-Z)", value: "series:name:asc" },
                    { label: "Tên (Z-A)", value: "series:name:desc" },
                    { label: "ID (tăng dần)", value: "series:id:asc" },
                    { label: "ID (giảm dần)", value: "series:id:desc" },
                  ]}
                  classNames={sortByClass}
                />

                <div className="flex items-center gap-3">
                  <h3 className="font-kanit text-2xl">Bộ lọc</h3>
                  <ClearRefinements
                    classNames={{
                      root: "inline-block",
                      button:
                        "text-sm bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 overflow-hidden rounded-xl py-1 px-2 transition-all duration-150 ease-linear",
                      disabledButton: "hidden",
                    }}
                    translations={{
                      resetButtonText: "Reset",
                    }}
                  />
                </div>

                <Disclosure as="div">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="mb-3 flex w-full items-center justify-between">
                        <h3 className="mb-1">Trạng thái</h3>
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
                          <RefinementList
                            attribute="status"
                            operator="or"
                            classNames={refinementListClass}
                          />
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>

                <Disclosure as="div">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="mb-3 flex w-full items-center justify-between">
                        <h3 className="mb-1">Loại truyện</h3>
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
                          <RefinementList
                            attribute="type.name"
                            operator="or"
                            classNames={refinementListClass}
                          />
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>

                <Disclosure as="div">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="mb-3 flex w-full items-center justify-between">
                        <h3 className="mb-1">Nhà xuất bản/phát hành</h3>
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
                          <RefinementList
                            attribute="publisher.name"
                            operator="or"
                            classNames={refinementListClass}
                          />
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
            <div className="flex-1">
              <SearchBox
                placeholder="Tìm bộ truyện"
                submitIconComponent={() => <></>}
                loadingIconComponent={() => <></>}
                classNames={searchClass}
              />
              <Hits classNames={hitsClass} hitComponent={HitComponent} />
            </div>
          </div>
          <div className="mt-6">
            <Pagination
              padding={2}
              showLast={true}
              classNames={paginationClass}
            />
          </div>
        </div>
      </InstantSearch>
    </Layout>
  );
}
