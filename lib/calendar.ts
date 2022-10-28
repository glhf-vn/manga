import { google } from "googleapis";
import _ from "lodash";
import Papa from "papaparse";
import { DateTime } from "luxon";

import calendarsData from "../data/calendars.json";

// get first date and last date of month
const firstDay = DateTime.now().startOf("month").toISO();
const lastDay = DateTime.now().endOf("month").toISO();

const googleApiKey = process.env.GOOGLE_API_KEY;

// get entries by lists, sorted from oldest to newest
export async function getEntries(
  start: string = firstDay,
  end: string = lastDay,
  calendars: any[] = calendarsData
) {
  const calendar = google.calendar({
    version: "v3",
    auth: googleApiKey,
  });

  let events = [];

  await Promise.all(
    calendars.map(async (publisher) => {
      const res = await calendar.events.list({
        calendarId: publisher.id,
        timeMin: start,
        timeMax: end,
      });

      res.data.items.map((entry) => {
        const parsedData: any[] = entry.description // not empty (!null)
          ? entry.description[0] != "<" // not html
            ? Papa.parse(entry.description).data // parse as csv
            : [[]] // dont parse
          : [[]]; // dont parse

        // price,image_url,description

        const data = parsedData[0];

        events.push({
          name: entry.summary,
          id: entry.id,
          publisher: publisher.label,
          publisherValue: publisher.value,
          date: entry.start.date,
          description: data[2] ?? null,
          image: data[1] ?? null,
          price: data[0]
            ? new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(parseInt(data[0]))
            : "chưa có",
        });
      });
    })
  );

  // sort ascending before return
  events = _.orderBy(events, [
    (element) => element.date,
    (element) => element.name,
  ]);

  return events;
}

export async function getEntriesByGroup(
  start: string = firstDay,
  end: string = lastDay
) {
  let events = await getEntries(start, end);

  let groupedEvents = _.groupBy(events, (element) => element.date);
  let mappedEvents = _.map(groupedEvents, (entries, date) => {
    return {
      date: date,
      entries: entries,
    };
  });

  return mappedEvents;
}
