import { getEntries, getEntriesByGroup, getPublishers } from "@lib/supabase";

import { DateTime } from "luxon";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Releases } from "../../index";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const year: number = params?.year ? +params.year : DateTime.now().year;
    const month: number = params?.month ? +params.month : DateTime.now().month;
    const startDate = DateTime.fromObject({ year, month }).startOf("month");
    const endDate = startDate.endOf("month");

    const releases = await getEntriesByGroup(
      startDate.toISODate(),
      endDate.toISODate()
    );

    const slideReleases = await getEntries(
      DateTime.now().toISODate(),
      DateTime.now().plus({ days: 3 }).toISODate()
    );

    const publishers = await getPublishers();

    return {
      props: {
        publishers,
        releases,
        slideReleases,
      },
    };
  } catch (error: any) {
    return {
      props: {
        errors: error.message,
      },
    };
  }
};

export default function Home({
  publishers,
  releases,
  slideReleases,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Releases
      publishers={publishers}
      releases={releases}
      slideReleases={slideReleases}
    />
  );
}
