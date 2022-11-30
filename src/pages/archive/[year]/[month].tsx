import { getEntries, getEntriesByGroup } from "@lib/supabase";

import { DateTime } from "luxon";
import { useState } from "react";

import Select from "react-select";
import { BsFilter } from "react-icons/bs";
import { Dialog } from "@headlessui/react";
import { NextSeo } from "next-seo";

import Layout from "@layouts/Layout";

import Card from "@components/Card";
import Button from "@components/Button";
import Badge from "@components/Badge";
import MonthSelect from "@components/MonthSelect";
import Banner from "@components/Banner";
import Cover from "@components/Cover";
import Modal from "@components/Modal";

import publishers from "@data/publishers.json";
import { colourStyles } from "@data/indexFilterStyles";

export async function getServerSideProps({ params }) {
  const startDate = DateTime.fromObject({
    year: params.year,
    month: params.month,
  }).startOf("month");
  const endDate = startDate.endOf("month");

  let events = await getEntriesByGroup(
    startDate.toISODate(),
    endDate.toISODate()
  );

  let bannerEvents = await getEntries(
    DateTime.now().toISODate(),
    DateTime.now().plus({ days: 3 }).toISODate()
  );

  return {
    props: {
      params,
      events,
      bannerEvents,
    },
  };
}

export default function Home({ params, events, bannerEvents }) {
  // Set the open state & data for the modal
  const [modalData, setModalData] = useState({
    name: null,
    publisher: null,
    publisherLabel: null,
    price: null,
    date: null,
    image_url: null,
    id: null,
    edition: null,
  });
  const [modalOpen, setModalOpen] = useState(false);

  // Set the open state & filter data
  const [filterData, setFilterData] = useState(
    publishers.map((value) => value.value)
  );
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <Layout>
      <NextSeo
        title={`Lịch phát hành tháng ${params.month}`}
        description="Xem lịch phát hành chưa bao giờ là dễ hơn, nay được tổng hợp từ nhiều NXB khác nhau!"
      />

      {/* Entry details modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:max-w-[250px]">
            <Cover
              entry={modalData}
              sizes="(max-width: 768px) 80vw, (max-width: 1024px) 25vw, 15vw"
            />
          </div>
          <div className="flex-1 p-6 sm:pt-9">
            <div className="flex h-full flex-col justify-between">
              <div>
                <Dialog.Title className="mb-3 font-kanit text-2xl font-bold lg:text-3xl">
                  {modalData.name}
                </Dialog.Title>
                <Dialog.Description>
                  <b>Ngày phát hành</b>:{" "}
                  {DateTime.fromISO(modalData.date)
                    .setLocale("vi")
                    .toLocaleString(DateTime.DATE_SHORT)}
                  <br />
                  {modalData.edition && (
                    <>
                      <b>Phiên bản</b>: {modalData.edition}
                      <br />
                    </>
                  )}
                  <br />
                  <b>Nhà xuất bản/phát hành</b>: {modalData.publisherLabel}
                  <br />
                  <b>Giá dự kiến</b>: {modalData.price}
                </Dialog.Description>
              </div>
              <div className="mt-6">
                <span className="font-bold">Tìm kiếm nhanh</span>
                <div className="mt-1 flex gap-2">
                  <Button
                    style={{ backgroundColor: "#c92127", color: "#ffffff" }}
                  >
                    <a
                      href={`https://fahasa.com/catalogsearch/result/?q=${modalData.name}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      FAHASA
                    </a>
                  </Button>
                  <Button
                    style={{ backgroundColor: "#1a94ff", color: "#ffffff" }}
                  >
                    <a
                      href={`https://tiki.vn/search?q=${modalData.name}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Tiki
                    </a>
                  </Button>
                  <Button
                    style={{ backgroundColor: "#ff6633", color: "#ffffff" }}
                  >
                    <a
                      href={`https://shopee.vn/search?keyword=${modalData.name}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Shopee
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Filter modal */}
      <Modal isOpen={filterOpen} onClose={() => setFilterOpen(false)}>
        <div>
          <h2 className="m-6 font-kanit text-xl font-bold">
            Lọc theo nhà xuất bản/phát hành
          </h2>
          <Select
            className="m-6 mb-48"
            styles={colourStyles}
            options={publishers}
            defaultValue={publishers}
            closeMenuOnSelect={false}
            closeMenuOnScroll={false}
            isSearchable={false}
            isMulti
            onChange={(values: any[]) => {
              setFilterData(values.map((value) => value.value));
            }}
          />
        </div>
      </Modal>

      <Banner items={bannerEvents} />

      <div className="container mx-auto mb-6 px-6">
        <div className="flex justify-between">
          <MonthSelect />
          <button
            className="rounded-2xl bg-zinc-200 px-2 text-xl sm:text-2xl lg:text-3xl"
            onClick={() => setFilterOpen(!filterOpen)}
            aria-label="Mở bộ lọc"
          >
            <BsFilter />
          </button>
        </div>

        {events.map((single) => {
          let date = DateTime.fromISO(single.date).setLocale("vi");
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
                {single.entries.map((entry) => {
                  if (filterData.includes(entry.publisher)) {
                    return (
                      <Card
                        onClick={() => {
                          setModalData(entry);
                          setModalOpen(true);
                        }}
                        key={entry.id}
                        clickable={true}
                        entry={entry}
                      >
                        {entry.edition && (
                          <div className="absolute top-0 right-0 w-fit max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap rounded-bl-2xl bg-gradient-to-br from-[#f8ed0b] to-[#f2b011] px-2 py-1 text-center text-sm font-bold">
                            {entry.edition}
                          </div>
                        )}
                        <Cover
                          entry={entry}
                          sizes="(max-width: 768px) 40vw, 200px"
                        />
                      </Card>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
