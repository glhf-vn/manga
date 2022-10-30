import { getSheetsContent } from "@lib/sheets";

import { useState } from "react";
import Select from "react-select";
import { Flipper, Flipped } from "react-flip-toolkit";
import { NextSeo } from "next-seo";

import Layout from "@layouts/Layout";

import Card from "@components/Card";
import Header from "@components/Header";
import Cover from "@components/Cover";
import Badge from "@components/Badge";

import typeFilterOptions from "@data/bookTypes.json";
import publisherFilterOptions from "@data/calendars.json";
import { selectStyles } from "@data/selectStyles";

const sheetId = process.env.SHEET_ID;

export async function getStaticProps() {
  const licenses = await getSheetsContent(sheetId, "licensed");

  return {
    props: {
      licenses,
    },
    revalidate: 3600, //revalidate every 1 hour
  };
}

export default function License({ licenses }) {
  const [typeFilter, setTypeFilter] = useState([]);
  const [publisherFilter, setPublisherFilter] = useState([]);

  typeFilter.length == 0 &&
    setTypeFilter(typeFilterOptions.map((e) => e.value));
  publisherFilter.length == 0 &&
    setPublisherFilter(publisherFilterOptions.map((e) => e.value));

  licenses = licenses.filter((license) => {
    return (
      typeFilter.includes(license.type.toLowerCase()) &&
      publisherFilter.includes(license.publisher)
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
          <h3>Loại truyện</h3>
          <Select
            styles={selectStyles}
            placeholder="Manga, Artbook,..."
            className="mt-3"
            options={typeFilterOptions}
            defaultValue={[]}
            closeMenuOnSelect={false}
            closeMenuOnScroll={false}
            isSearchable={false}
            isMulti
            onChange={(values: any[]) => {
              setTypeFilter(values.map((value) => value.value));
            }}
          />
          <br />
          <h3>Nhà xuất bản/phát hành</h3>
          <Select
            styles={selectStyles}
            placeholder="NXB Kim Đồng, NXB Trẻ,..."
            className="mt-3"
            options={publisherFilterOptions}
            defaultValue={[]}
            closeMenuOnSelect={false}
            closeMenuOnScroll={false}
            isSearchable={false}
            isMulti
            onChange={(values: any[]) => {
              setPublisherFilter(values.map((value) => value.value));
            }}
          />
        </div>
        <Flipper flipKey={licenses.length} className="flex-1">
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {licenses.map((manga) => {
              return (
                <Flipped key={manga.name} flipId={manga.name}>
                  <li>
                    <Card>
                      <div className="grid grid-cols-3">
                        <div className="col-span-1">
                          <Cover entry={manga} fit="full" />
                        </div>
                        <div className="relative col-span-2 flex flex-col justify-between">
                          <div className="absolute top-1 right-1">
                            <Badge>{manga.type}</Badge>
                          </div>
                          <div className="p-6">
                            <span className="text-sm">
                              {
                                publisherFilterOptions.find(
                                  (e) => e.value == manga.publisher
                                ).label
                              }
                            </span>
                            <h3 className="font-kanit text-2xl">
                              {manga.name}
                            </h3>
                          </div>
                          {(manga.source || manga.anilist) && (
                            <div className="border-t border-zinc-200 px-3 text-right text-zinc-600">
                              {manga.source && (
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href={manga.source}
                                  className="inline-block px-3 py-3"
                                >
                                  Nguồn
                                </a>
                              )}
                              {manga.anilist && (
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href={`//anilist.co/manga/${manga.anilist}`}
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
