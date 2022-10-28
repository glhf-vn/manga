import { getEntries, getEntriesByGroup } from "../../../lib/calendar";

import { DateTime } from "luxon";
import chroma from "chroma-js";
import { useState } from "react";

import { Kanit } from "@next/font/google";
import Select from "react-select";
import ReactModal from "react-modal";
import { BsFilter, BsXLg } from "react-icons/bs";

import Banner from "../../../components/Banner";
import Cover from "../../../components/Cover";
import Layout from "../../../components/layout";
import ArchiveList from "../../../components/ArchiveList";

import calendarsData from "../../../data/calendars.json";
import Badge from "../../../components/Badge";

const kanit = Kanit({
  weight: "700",
});
export async function getStaticPaths() {
  const lastMonth = DateTime.now().minus({ month: 1 });
  const thisMonth = DateTime.now();
  const nextMonth = DateTime.now().plus({ month: 1 });

  return {
    paths: [
      {
        params: {
          year: lastMonth.get("year").toString(),
          month: lastMonth.get("month").toString(),
        },
      },
      {
        params: {
          year: thisMonth.get("year").toString(),
          month: thisMonth.get("month").toString(),
        },
      },
      {
        params: {
          year: nextMonth.get("year").toString(),
          month: nextMonth.get("month").toString(),
        },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const startDate = DateTime.fromObject({
    year: params.year,
    month: params.month,
  }).startOf("month");
  const endDate = startDate.endOf("month");

  const events = await getEntriesByGroup(startDate.toISO(), endDate.toISO());

  const bannerEvents = await getEntries(
    DateTime.now().toISO(),
    DateTime.now().plus({ days: 3 }).toISO()
  );

  return {
    props: {
      events,
      bannerEvents,
    },
  };
}

export default function Home({ events, bannerEvents }) {
  const [modalData, setModalData] = useState({
    name: null,
    publisher: null,
    price: null,
    date: null,
  });
  const [modalOpen, setModalOpen] = useState(false);

  const [filterData, setFilterData] = useState(
    calendarsData.map((value) => value.value)
  );
  const [filterOpen, setFilterOpen] = useState(false);

  const colourStyles = {
    container: (provided) => ({
      ...provided,
      display: filterOpen ? "block" : "none",
    }),
    control: (provided) => ({
      ...provided,
      border: "none",
      background: "none",
      borderRadius: "none",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "unset",
    }),
    option: (provided, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...provided,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...provided[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };

  return (
    <Layout>
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className={"EntryModal__Content"}
        overlayClassName={{
          base: "EntryModal__Overlay",
          afterOpen: "EntryModal__Overlay--after-open",
          beforeClose: "EntryModal__Overlay--before-close",
        }}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        closeTimeoutMS={150}
        ariaHideApp={false}
      >
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
      </ReactModal>
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
        <Select
          className="mt-3"
          styles={colourStyles}
          options={calendarsData}
          defaultValue={calendarsData}
          closeMenuOnSelect={false}
          closeMenuOnScroll={false}
          isMulti
          onChange={(values: any[]) => {
            setFilterData(values.map((value) => value.value));
          }}
        />
        {events.map((single) => {
          let date = DateTime.fromISO(single.date).setLocale("vi");
          let today = DateTime.now();

          return (
            <div key={date.valueOf()}>
              <div className={`mt-12 mb-3 flex items-center text-xl font-bold`}>
                <span className="capitalize">
                  {date.toFormat("EEEE - dd/MM")}
                </span>
                {date < today && <Badge status="success">Đã phát hành!</Badge>}
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
