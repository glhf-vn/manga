import { getEntries, getEntriesByGroup } from "../lib/calendar";

import moment from "moment";
import "moment/locale/vi";
import Banner from "../components/Banner";
import Cover from "../components/Cover";
import Layout from "../components/layout";
import ReactModal from "react-modal";
import { useState } from "react";
moment.locale("vi");

import { BsXLg } from "react-icons/bs";

const pageTitle = "Lịch phát hành Manga";
const pageDescription =
  "Xem lịch phát hành manga chưa bao giờ là dễ hơn, nay được tổng hợp từ nhiều NXB khác nhau!";

export async function getStaticProps() {
  const events = await getEntriesByGroup();

  const bannerEvents = await getEntries(
    moment().toISOString(),
    moment().add(3, "days").toISOString()
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
    description: null,
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
      >
        <BsXLg
          className="absolute top-3 right-3 cursor-pointer text-lg text-gray-500"
          onClick={() => setModalOpen(false)}
        />
        <div className="flex flex-col sm:flex-row">
          <div class="w-full max-w-[250px]">
            <Cover entry={modalData} />
          </div>
          <div className="flex-1 p-6 sm:pt-9">
            <h2 className="mb-3 font-display text-2xl font-bold lg:text-3xl">
              {modalData.name}
            </h2>
            <p>
              <b>Phát hành</b>: {modalData.publisher}
            </p>
            <p>
              <b>Giá dự kiến</b>: {modalData.price ?? <>chưa có</>}
            </p>
            <p className="mt-3">{modalData.description}</p>
          </div>
        </div>
      </ReactModal>
      <Banner items={bannerEvents} />
      <div className="container mx-auto mb-6 px-6">
        {events.map((single) => {
          let date = moment(single.date);

          return (
            <>
              <h1 className="mt-12 mb-3 font-display text-4xl font-bold">
                <span className="capitalize">
                  {moment(date).format("dddd - DD/MM")}
                </span>
              </h1>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
                {single.entries.map((entry) => {
                  return (
                    <a
                      onClick={() => {
                        setModalData(entry);
                        setModalOpen(true);
                      }}
                      className="cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all ease-in-out hover:shadow-lg"
                    >
                      <Cover entry={entry} />
                    </a>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </Layout>
  );
}
