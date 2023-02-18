import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { getSerie, getSeriesId } from "@lib/supabase";

import { imageEndpoint, imageLoader } from "@data/config";

import { DateTime } from "luxon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import slug from "slug";

import { NextSeo } from "next-seo";
import Image from "next/image";
import {
  BsBookmarkCheck,
  BsPencilSquare,
  BsCalendarCheck,
  BsCalendar2CheckFill,
  BsBoxArrowUp,
  BsClipboardCheck,
} from "react-icons/bs";

import Layout from "@layouts/Layout";
import LightGallery from "lightgallery/react";

import Cover from "@components/Cover";
import Card from "@components/Card";
import Badge from "@components/Badge";
import Button from "@components/Button";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgZoom from "lightgallery/plugins/zoom";

interface SerieReleasesView {
  data:
    | {
        id: string;
        name: string;
        date: string;
        edition: string | null;
        price: number;
        image_url: string[] | null;
      }[]
    | null;
}

const ListView = ({ data }: SerieReleasesView) => (
  <div className="mx-auto mb-12 overflow-scroll lg:container">
    <div className="px-6">
      <table className="w-full min-w-fit overflow-hidden border dark:border-zinc-600">
        <thead className="font-bold dark:bg-zinc-700">
          <tr>
            <th className="p-3">Tên</th>
            <th className="p-3">Ngày phát hành</th>
            <th className="p-3">Giá</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((entry) => {
            const date = DateTime.fromISO(entry.date);
            const today = DateTime.now();

            return (
              <tr className="border-t dark:border-zinc-600" key={entry.id}>
                <td className="whitespace-nowrap p-3 decoration-primary decoration-2">
                  <div className="flex items-center">
                    <span>{entry.name}</span>
                    {entry.edition && (
                      <Badge
                        intent="none"
                        className="ml-3 bg-amber-200/75 backdrop-blur-md"
                      >
                        {entry.edition}
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="whitespace-nowrap p-3 text-center font-bold">
                  <span>{date.toFormat("dd/MM/yyyy")}</span>
                  {date < today && (
                    <BsCalendar2CheckFill className="ml-3 inline-block align-baseline text-green-200" />
                  )}
                </td>
                <td className="whitespace-nowrap p-3 text-center">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(entry.price)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

const CoverView = ({ data }: SerieReleasesView) => (
  <LightGallery
    speed={500}
    plugins={[lgZoom]}
    elementClassNames="grid grid-cols-2 gap-6 px-6 md:grid-cols-4 lg:grid-cols-6"
  >
    {data?.map((entry) =>
      entry.image_url?.map((image_url, i) => (
        <Card
          key={`${entry.id}_${i}`}
          clickable={true}
          data-src={`${imageEndpoint}${image_url}`}
        >
          {entry.edition && (
            <Badge
              intent="none"
              className="absolute top-2 right-2 bg-amber-200/75 backdrop-blur-md"
            >
              {entry.edition}
            </Badge>
          )}
          <Image
            src={image_url}
            alt={`${entry.name}${entry.edition ? ` (${entry.edition})` : ""}`}
            loader={imageLoader}
            width={300}
            height={450}
            sizes="(max-width: 768px) 40vw, 200px"
          />
        </Card>
      ))
    )}
  </LightGallery>
);

export const getStaticPaths = async () => {
  let series = await getSeriesId();

  return {
    paths: series.map((serie) => ({
      params: { id: String(serie.id), slug: [slug(serie.name)] },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  try {
    const id = context.params!.id as string;

    const data = await getSerie(parseInt(id));

    if (!data) {
      return { notFound: true };
    }

    return {
      props: {
        data: {
          ...data,
          id: String(data.id),
          status:
            data.status == "Finished" ? 3 : data.status == "Published" ? 2 : 1,
        },
      },
      revalidate: 86400, // revalidate per day
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default function Serie({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!router.isFallback) {
      // Always do navigations after the first render
      router.replace(`/license/${data.id}/${slug(data.name)}`, undefined, {
        shallow: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (router.isFallback) {
    return (
      <Layout>
        <NextSeo title="Đang tải..." />

        <div className="container mx-auto flex h-screen items-center justify-center px-3">
          <div className="animate-bounce text-center">
            <p>{"(っ˘ω˘ς )"}</p>
            <h1 className="my-3 font-kanit text-6xl font-bold">Đang tải...</h1>
            <p>Bạn chờ xíu nhé!</p>
          </div>
        </div>
      </Layout>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Bản quyền ${data.name}`,
          text: `Xem thông tin bản quyền và lịch xuất bản của ${data.name} trên mangaGLHF!`,
          url: `/license/${data.id}/${slug(data.name)}`,
        });
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    } else {
      await navigator.clipboard.writeText(
        `https://manga.glhf.vn/license/${data.id}/${slug(data.name)}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const { publication, licensed, publisher, type } = data;

  return (
    <Layout>
      <NextSeo
        title={`Bản quyền ${data.name}`}
        description={`${data.name} hiện đã được mua bản quyền bởi ${
          data.publisher!.name
        }, xem thêm thông tin trên mangaGLHF!`}
        openGraph={{
          title: `Bản quyền ${data.name}`,
          description: `Xem thông tin bản quyền và lịch xuất bản của ${data.name} trên mangaGLHF!`,
          images: [
            {
              url: encodeURI(
                `https://manga.glhf.vn/api/og/serie?name=${
                  data.name
                }&publisher=${publisher!.name}&type=${type!.name}&status=${
                  data.status
                }${
                  data.image_url
                    ? `&image_url=${imageEndpoint}${data.image_url}`
                    : ""
                }`
              ),
              width: 1200,
              height: 630,
              alt: data.name,
            },
          ],
        }}
      />

      <div className="relative mb-12">
        <div className="absolute inset-0 bottom-1/4 bg-zinc-100 shadow-[inset_0_0_1rem_0_rgba(0,0,0,0.1)] dark:bg-zinc-900"></div>
        <div className="container relative mx-auto flex flex-col-reverse gap-6 px-6 sm:flex-row sm:gap-12 sm:pt-6">
          <div className="overflow-hidden rounded-2xl shadow-md transition-shadow duration-150 ease-linear hover:shadow-lg sm:basis-72">
            <Cover
              useLoader={data.use_loader}
              entry={data}
              fit="full"
              sizes="(max-width: 768px) 80vw, (max-width: 1024px) 25vw, 15vw"
            />
          </div>
          <div className="pt-20 sm:flex-1 sm:pt-8">
            <Badge className="m-0" style={{ backgroundColor: type!.color }}>
              {type!.name}
            </Badge>
            <h2 className="mt-3 mb-6 font-kanit text-4xl font-bold">
              {data.name}
            </h2>
            <p>
              <b>Nhà xuất bản/phát hành</b>: {publisher!.name}
            </p>

            <div className="mt-6 flex space-x-3">
              <Button intent="secondary" onClick={handleShare}>
                {copied ? (
                  <>
                    <BsClipboardCheck className="h-[20px] w-[20px]" />
                    Đã sao chép
                  </>
                ) : (
                  <>
                    <BsBoxArrowUp className="h-[20px] w-[20px]" />
                    Chia sẻ
                  </>
                )}
              </Button>
              {data.anilist && (
                <Button
                  href={`https://anilist.co/manga/${data.anilist}`}
                  className="text-bold bg-[#152232] text-white"
                >
                  <Image
                    src="/img/anilist-logo.png"
                    height={20}
                    width={20}
                    alt="AniList logo"
                  />
                  AniList
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="mx-auto mb-12 grid grid-cols-3 text-center">
          <div className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-300 p-3 text-xl dark:bg-green-700">
              <BsPencilSquare />
            </div>
            <span className="mt-3">Đã mua bản quyền</span>
          </div>
          <div
            className={`${
              data.status > 1
                ? "before:bg-green-300 dark:before:bg-green-700"
                : "before:bg-zinc-200 dark:before:bg-zinc-700"
            } relative flex flex-col items-center before:absolute before:left-[calc(-50%+2.25rem)] before:top-6 before:h-1 before:w-[calc(100%-4.5rem)] `}
          >
            <div
              className={`${
                data.status > 1
                  ? "bg-green-300 dark:bg-green-700"
                  : "bg-zinc-200 dark:bg-zinc-700"
              } flex h-14 w-14 items-center justify-center rounded-full  p-3 text-xl`}
            >
              <BsCalendarCheck />
            </div>
            <span className="mt-3">Đã phát hành</span>
          </div>
          <div
            className={`${
              data.status > 2
                ? "before:bg-green-300 dark:before:bg-green-700"
                : "before:bg-zinc-200 dark:before:bg-zinc-700"
            } relative flex flex-col items-center before:absolute before:left-[calc(-50%+2.25rem)] before:top-6 before:h-1 before:w-[calc(100%-4.5rem)] `}
          >
            <div
              className={`${
                data.status > 2
                  ? "bg-green-300 dark:bg-green-700"
                  : "bg-zinc-200 dark:bg-zinc-700"
              } flex h-14 w-14 items-center justify-center rounded-full p-3 text-xl`}
            >
              <BsBookmarkCheck />
            </div>
            <span className="mt-3">Đã hoàn thành</span>
          </div>
        </div>

        {licensed && (
          <>
            <h3 className="mb-6 px-6 font-kanit text-2xl font-bold">
              Thông tin bản quyền
            </h3>
            <p className="mb-12 px-6">
              Bộ truyện được mua bản quyền bởi <b>{publisher!.name}</b> vào ngày{" "}
              <b>{DateTime.fromISO(licensed.timestamp).toLocaleString()}</b>{" "}
              {licensed.source && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                  href={licensed.source}
                >
                  {"(nguồn)"}
                </a>
              )}
              .{" "}
              {data.status == 1 && (
                <>
                  Hiện tại đã được...{" "}
                  <b>
                    {DateTime.now()
                      .diff(DateTime.fromISO(licensed.timestamp), "days")
                      .toFormat("d 'ngày'")}{" "}
                  </b>{" "}
                  kể từ hôm ấy o(TヘTo)
                </>
              )}
            </p>
          </>
        )}

        {data.status >= 2 && (
          <>
            <h3 className="mb-6 px-6 font-kanit text-2xl font-bold">
              Lịch phát hành
            </h3>
            <ListView data={publication} />

            <h3 className="mb-6 px-6 font-kanit text-2xl font-bold">Ảnh bìa</h3>
            <CoverView data={publication} />
          </>
        )}
      </div>
    </Layout>
  );
}
