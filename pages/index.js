import { getEntries, getEntriesByGroup } from "../lib/calendar";

import moment from "moment";
import "moment/locale/vi";
import Banner from "../components/Banner/Banner";
import Header from "../components/Header/header";
import Cover from "../components/Cover";
moment.locale("vi");

const pageTitle = "Lịch phát hành Manga";
const pageDescription =
  "Xem lịch phát hành manga chưa bao giờ là dễ hơn, nay được tổng hợp từ nhiều NXB khác nhau!";

export async function getStaticProps() {
  const events = await getEntriesByGroup();

  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const startDate = new Date();
  const endDate = startDate.addDays(3);

  const bannerEvents = await getEntries(startDate, endDate);

  return {
    props: {
      events,
      bannerEvents,
    },
    revalidate: 7200,
  };
}

export default function Home({ events, bannerEvents }) {
  console.log(events);

  return (
    <>
      <Header />
      <Banner items={bannerEvents} />
      <div className="container mx-auto px-6 mb-6">
        {events.map((single) => {
          return (
            <>
              <h1 className="font-display text-4xl font-bold mt-12 mb-3">
                Phát hành {single.date}
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {single.entries.map((entry) => {
                  return <Cover name={entry.name} id={entry.id} />;
                })}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
