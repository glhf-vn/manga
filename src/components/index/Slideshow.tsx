import type { SliderProps } from "@data/index.types";

import { DateTime } from "luxon";
import { MutableRefObject, useRef } from "react";

import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Navigation, Pagination as SPagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { VND } from "@data/config";

import Card from "@components/Card";
import Cover from "@components/Cover";
import Badge from "@components/Badge";
import Header from "@components/Header";

import "swiper/css";
import "swiper/css/pagination";

const Slideshow = ({ data }: SliderProps) => {
  const progressSlider = useRef() as MutableRefObject<HTMLDivElement>;

  const setProgress = (progress: number) => {
    progressSlider.current.style.setProperty(
      "width",
      `${(1 - progress) * 100}%`
    );
  };

  if (data.length == 0) return <Header>Lịch phát hành</Header>;

  return (
    <>
      <div className="block bg-zinc-100 px-6 pt-20 dark:bg-zinc-900 sm:hidden">
        <span className="font-kanit text-3xl font-bold">Phát hành</span>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bottom-[30%] bg-zinc-100 shadow-[inset_0_-1rem_1rem_-1rem_rgba(0,0,0,0.1)] dark:bg-zinc-900" />

        <Swiper
          modules={[Navigation, SPagination, Autoplay]}
          navigation={{
            nextEl: ".button-next",
            prevEl: ".button-prev",
          }}
          pagination={{
            clickable: true,
            el: ".pagination",
            type: "bullets",
            bulletClass: "swiper-pagination-bullet dark:bg-white",
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          rewind={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          spaceBetween={12}
          onAutoplayTimeLeft={(_, __, percentage) => setProgress(percentage)}
        >
          {data.map((release, index) => (
            <SwiperSlide
              key={release.id}
              style={{ width: "calc(100% - 48px)" }}
            >
              <div className="container mx-auto flex flex-col-reverse gap-6 pb-12 sm:flex-row sm:gap-12 sm:px-6 sm:pt-6">
                <Card className="sm:basis-72">
                  {release.edition && (
                    <Badge
                      className="absolute top-2 right-2 bg-amber-200/75 backdrop-blur-md"
                      intent="none"
                    >
                      {release.edition}
                    </Badge>
                  )}
                  <Cover
                    entry={release}
                    hero={true}
                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 25vw, 15vw"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </Card>
                <div className="sm:flex-1 sm:pt-20">
                  <span className="hidden sm:inline">Phát hành </span>
                  <span className="text-xl sm:text-base">
                    <span className="capitalize">
                      {DateTime.fromISO(release.date!).toFormat("EEEE, D")}
                    </span>
                  </span>
                  <h2 className="mt-3 mb-6 hidden font-kanit text-4xl font-bold sm:block">
                    {release.name}
                  </h2>
                  <p className="hidden sm:block">
                    <b>Nhà xuất bản/phát hành</b>: {release.publisher.name}
                    <br />
                    <b>Giá dự kiến</b>: {VND.format(release.price)}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <button
            aria-label="Trước"
            className="button-prev absolute top-[40%] left-6 z-10 hidden -translate-y-[40%] transform text-4xl text-zinc-500 md:block"
          >
            <BsChevronCompactLeft />
          </button>
          <button
            aria-label="Sau"
            className="button-next absolute top-[40%] right-6 z-10 hidden -translate-y-[40%] transform text-4xl text-zinc-500 md:block"
          >
            <BsChevronCompactRight />
          </button>

          <div
            className="pagination container absolute z-20 mx-auto hidden -translate-x-1/2 transform p-6 text-right sm:block"
            style={{ height: "min-content", left: "50%" }}
          />

          <div
            className="progress absolute top-[70%] left-0 h-1 bg-primary"
            ref={progressSlider}
          />
        </Swiper>
      </div>
    </>
  );
};

export default Slideshow;
