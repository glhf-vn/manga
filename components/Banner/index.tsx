import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { DateTime } from "luxon";
import { Kanit } from "@next/font/google";

import "@splidejs/react-splide/css/core";
import banner from "./banner.module.scss";

import Cover from "../Cover";

const kanit = Kanit({
  weight: "700",
});

export default function Banner({ items }) {
  return (
    <div className={`relative ${banner.container}`}>
      <Splide
        hasTrack={false}
        options={{
          autoplay: true,
          interval: 5000,
          rewind: true,
          arrows: false,
          pagination: false,
          breakpoints: {
            640: {
              padding: "1.5rem",
              gap: "1rem",
            },
          },
        }}
        className="pt-20 sm:pt-6"
      >
        <div className="block px-6 sm:hidden">
          <span className={`text-3xl ${kanit.className}`}>Phát hành</span>
        </div>
        <SplideTrack>
          {items.map((entry) => {
            return (
              <SplideSlide key={entry.id}>
                <div className="container mx-auto flex flex-col-reverse gap-6 pb-12 sm:flex-row sm:gap-12 sm:px-6">
                  <div className="cursor-default overflow-hidden rounded-2xl shadow-md transition-all ease-in-out hover:shadow-lg sm:basis-72">
                    <Cover entry={entry} hero={true} />
                  </div>
                  <div className="sm:flex-1 sm:pt-20">
                    <span className="hidden sm:inline">Phát hành </span>
                    <span className="text-xl sm:text-base">
                      <span className="capitalize">
                        {DateTime.fromISO(entry.date)
                          .setLocale("vi")
                          .toFormat("EEEE, D")}
                      </span>
                    </span>
                    <h2
                      className={`mt-3 mb-6 hidden text-4xl sm:block ${kanit.className}`}
                    >
                      {entry.name}
                    </h2>
                    <p className="hidden sm:block">
                      <b>Nhà xuất bản/phát hành</b>: {entry.publisher}
                      <br />
                      <b>Giá dự kiến</b>: {entry.price}
                    </p>
                  </div>
                </div>
              </SplideSlide>
            );
          })}
        </SplideTrack>

        <div className="splide__progress absolute top-[75%] left-0 right-0 -z-10 hidden sm:block">
          <div className="splide__progress__bar h-1 bg-primary" />
        </div>
      </Splide>
    </div>
  );
}
