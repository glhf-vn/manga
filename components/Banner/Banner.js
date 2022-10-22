import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import moment from "moment";

import "@splidejs/react-splide/css/core";
import banner from "./banner.module.scss";

import Cover from "../Cover";

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
        <div className="block sm:hidden px-6">
          <span className="text-3xl font-display font-bold">Phát hành</span>
        </div>
        <SplideTrack>
          {items.map((entry) => {
            return (
              <SplideSlide>
                <div className="container flex flex-col-reverse sm:flex-row gap-6 sm:gap-12 mx-auto sm:px-6 pb-12">
                  <div className="sm:basis-72">
                    <Cover entry={entry} hero={true} />
                  </div>
                  <div className="sm:pt-20 sm:flex-1">
                    <span className="hidden sm:inline">Phát hành </span>
                    <span className="text-xl sm:text-base">
                      {moment(entry.date).format("dddd, DD/MM/yyyy")}
                    </span>
                    <h2 className="font-bold font-display text-4xl mt-3 mb-6 hidden sm:block">
                      {entry.name}
                    </h2>
                    <p
                      dangerouslySetInnerHTML={{ __html: entry.description }}
                      className="hidden sm:block"
                    ></p>
                  </div>
                </div>
              </SplideSlide>
            );
          })}
        </SplideTrack>

        <div className="splide__progress absolute top-[75%] left-0 right-0 -z-10 hidden sm:block">
          <div className="splide__progress__bar bg-primary h-1" />
        </div>
      </Splide>
    </div>
  );
}
