import { getEntries, getEntriesByGroup } from "@lib/calendar";

import { DateTime } from "luxon";
import { useState } from "react";

import Select from "react-select";
import { Kanit } from "@next/font/google";
import { BsFilter, BsXLg } from "react-icons/bs";

import Layout from "@layouts/layout";

import Badge from "@components/Badge";
import ArchiveList from "@components/ArchiveList";
import Banner from "@components/Banner";
import Cover from "@components/Cover";
import Modal from "@components/Modal";

import calendarsData from "@data/calendars.json";
import { colourStyles } from "@data/indexFilterStyles";

const kanit = Kanit({
  weight: "700",
});

export async function getStaticProps() {
  const events = await getEntriesByGroup();

  const bannerEvents = await getEntries(
    DateTime.now().toISO(),
    DateTime.now().plus({ days: 3 }).toISO()
  );

  return {
    props: {
      events,
      bannerEvents,
    },
    revalidate: 7200,
  };
}

export default function Home({ events, bannerEvents }) {
  // Set the open state & data for the modal
  const [modalData, setModalData] = useState({
    name: null,
    publisher: null,
    price: null,
    date: null,
    image: null,
  });
  const [modalOpen, setModalOpen] = useState(false);

  // Set the open state & filter data
  const [filterData, setFilterData] = useState(
    calendarsData.map((value) => value.value)
  );
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <Layout>
      {/* Entry details modal */}
      <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <BsXLg
          className="absolute top-3 right-3 cursor-pointer text-lg text-gray-500"
          onClick={() => setModalOpen(false)}
        />
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:max-w-[250px]">
            <Cover entry={modalData} />
          </div>
          <div className="flex-1 p-6 sm:pt-9">
            <h2 className={`mb-3 text-2xl lg:text-3xl ${kanit.className}`}>
              {modalData.name}
            </h2>
            <span>
              <b>Ngày phát hành</b>:{" "}
              {DateTime.fromISO(modalData.date)
                .setLocale("vi")
                .toLocaleString(DateTime.DATE_SHORT)}
            </span>
            <p className="mt-3">
              <b>Nhà xuất bản/phát hành</b>: {modalData.publisher}
              <br />
              <b>Giá dự kiến</b>: {modalData.price}
            </p>
          </div>
        </div>
      </Modal>

      {/* Filter modal */}
      <Modal isOpen={filterOpen} onRequestClose={() => setFilterOpen(false)}>
        <BsXLg
          className="absolute top-3 right-3 cursor-pointer text-lg text-gray-500"
          onClick={() => setFilterOpen(false)}
        />
        <div>
          <h2 className={`m-6 text-xl ${kanit.className}`}>
            Lọc theo nhà xuất bản/phát hành
          </h2>
          <Select
            className="m-6 mb-48"
            styles={colourStyles}
            options={calendarsData}
            defaultValue={calendarsData}
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
          <ArchiveList />
          <button
            className="rounded-2xl bg-zinc-200 px-2 text-xl sm:text-2xl lg:text-3xl"
            onClick={() => setFilterOpen(!filterOpen)}
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
                  if (filterData.includes(entry.publisherValue)) {
                    return (
                      <a
                        onClick={() => {
                          setModalData(entry);
                          setModalOpen(true);
                        }}
                        className="h-fit cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all ease-in-out hover:shadow-lg"
                        key={entry.id}
                      >
                        <Cover entry={entry} />
                      </a>
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
