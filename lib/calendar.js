import { google } from "googleapis";
import _ from "lodash";
import matter from "gray-matter";

import calendarsData from "../calendar.config";

const now = new Date();

// get first date and last date of month
const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

const googleApiKey = process.env.GOOGLE_API_KEY;

// get entries by lists, sorted from oldest to newest
export async function getEntries(start = firstDay, end = lastDay) {
  const calendar = google.calendar({
    version: "v3",
    auth: googleApiKey,
  });

  let events = [];

  await Promise.all(
    calendarsData.map(async (publisher) => {
      const res = await calendar.events.list({
        calendarId: publisher.id,
        timeMin: start,
        timeMax: end,
      });

      res.data.items.map((entry) => {
        let grayMatter = matter(entry.description);

        events.push({
          name: entry.summary,
          id: entry.id,
          publisher: publisher.name,
          description: grayMatter.content,
          date: entry.start.date,
          image: grayMatter.data.image ?? null,
          publisher: grayMatter.data.publisher ?? null,
          price: grayMatter.data.price ?? null,
        });
      });
    })
  );

  // data sample:
  // {
  //   name: 'Những câu chuyện về người cá - Boxset 3 tập',
  //   id: '38017o54k7lhf0n5uoflc84ndm',
  //   publisher: 'NXB Trẻ',
  //   description: '<b>Nhà xuất bản</b>: NXB Trẻ<br><b>Giá dự kiến</b>: xx,000₫',
  //   date: '2022-10-21'
  // }

  // sort ascending before return
  events = _.orderBy(events, [
    (element) => element.date,
    (element) => element.name,
  ]);

  return events;
}

export async function getEntriesByGroup(start = firstDay, end = lastDay) {
  let events = await getEntries(start, end);

  events = _.groupBy(events, (element) => element.date);
  events = _.map(events, (entries, date) => {
    return {
      date: date,
      entries: entries,
    };
  });

  return events;
}
