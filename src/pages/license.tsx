import { getLicensed, getTypes, getPublishers } from "@lib/supabase";

import type { InferGetStaticPropsType } from "next";
import { Flipper, Flipped } from "react-flip-toolkit";
import { NextSeo } from "next-seo";
import { Disclosure, Transition } from "@headlessui/react";
import { BsPlus } from "react-icons/bs";

import Layout from "@layouts/Layout";

import Card from "@components/Card";
import Header from "@components/Header";
import Cover from "@components/Cover";
import Badge from "@components/Badge";
import { useState } from "react";

const Filter = ({
  title,
  values,
  handler,
}: {
  title: string;
  values: { id: string; name: string; color: string }[];
  handler: (checked: boolean, filterId: string) => void;
}) => {
  return (
    <Disclosure as="div">
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
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export const getStaticProps = async () => {
  const licenses = await getLicensed();
  const types = await getTypes();
  const publishers = await getPublishers();

  return {
    props: {
      licenses,
      types,
      publishers,
    },
    revalidate: 3600, //revalidate every 1 hour
  };
};

export default function License({
  licenses,
  types,
  publishers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [filterTypes, changeFilterTypes] = useState(
    types.map((type) => type.id)
  );
  const [filterPublishers, changeFilterPublishers] = useState(
    publishers.map((publishers) => publishers.id)
  );

  const handleChangeFilterTypes = (checked: boolean, filterId: string) => {
    if (!checked) {
      // if uncheck
      changeFilterTypes(filterTypes.filter((type) => type != filterId)); //remove filterId from array
    } else {
      changeFilterTypes([...filterTypes, filterId]); // add filterId to array
    }
  };

  const handleChangeFilterPublishers = (checked: boolean, filterId: string) => {
    if (!checked) {
      // if uncheck
      changeFilterPublishers(
        filterPublishers.filter((publisher) => publisher != filterId)
      ); //remove filterId from array
    } else {
      changeFilterPublishers([...filterPublishers, filterId]); // add filterId to array
    }
  };

  licenses = licenses.filter((license) => {
    return (
      filterTypes.includes(license.type.toLowerCase()) &&
      filterPublishers.includes(license.publisher)
    );
  });

  return (
    <Layout>
      <NextSeo
        title="Thông tin bản quyền"
        description="Xem thông tin manga/light-novel được mua bản quyền, cập nhật thường xuyên!"
      />

      <Header>Thông tin bản quyền</Header>

      <div className="container mx-auto flex flex-col gap-6 px-6 md:flex-row-reverse">
        <div className="basis-56 lg:basis-72">
          <h2 className="font-kanit text-2xl">Bộ lọc</h2>
          <br />
          <Filter
            title="Loại truyện"
            values={types}
            handler={handleChangeFilterTypes}
          />
          <br />

          <Filter
            title="Nhà xuất bản/phát hành"
            values={publishers}
            handler={handleChangeFilterPublishers}
          />
        </div>
        <Flipper flipKey={licenses.length} className="flex-1">
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {licenses.map((license) => {
              return (
                <Flipped key={license.id} flipId={license.id}>
                  <li>
                    <Card>
                      <div className="grid grid-cols-3">
                        <div className="col-span-1">
                          <Cover loader={false} entry={license} fit="full" />
                        </div>
                        <div className="relative col-span-2 flex flex-col justify-between">
                          <div className="absolute top-1 right-1">
                            <Badge>{license.type}</Badge>
                          </div>
                          <div className="p-6">
                            <span className="text-sm">
                              {license.publisherLabel}
                            </span>
                            <h3 className="font-kanit text-2xl">
                              {license.name}
                            </h3>
                          </div>
                          {(license.source || license.anilist) && (
                            <div className="border-t border-zinc-200 px-3 text-right text-zinc-600">
                              {license.source && (
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href={license.source}
                                  className="inline-block px-3 py-3"
                                >
                                  Nguồn
                                </a>
                              )}
                              {license.anilist && (
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href={`//anilist.co/manga/${license.anilist}`}
                                  className="inline-block px-3 py-3"
                                >
                                  AniList
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </li>
                </Flipped>
              );
            })}
          </ul>
        </Flipper>
      </div>
    </Layout>
  );
}
