import { getEntries, getEntriesByGroup } from "../lib/calendar";

import { DateTime } from "luxon";
import Banner from "../components/Banner";
import Cover from "../components/Cover";
import Layout from "../components/layout";
import ReactModal from "react-modal";
import { useState } from "react";
import { Kanit } from "@next/font/google";

import { BsXLg } from "react-icons/bs";
import ArchiveList from "../components/ArchiveList";

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
  const [modalData, setModalData] = useState({
    name: null,
    publisher: null,
    price: null,
    date: null,
  });
  const [modalOpen, setModalOpen] = useState(false);

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
        <ArchiveList />
        {events.map((single) => {
          let date = DateTime.fromISO(single.date).setLocale("vi");

          return (
            <div id={date.toFormat("dd/MM")} key={date.valueOf()}>
              <h2 className={`mt-12 mb-3 text-xl font-bold`}>
                <span className="capitalize">
                  {date.toFormat("EEEE - dd/MM")}
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
                {single.entries.map((entry) => {
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
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
