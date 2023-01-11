import Layout from "@layouts/Layout";
import { getSeries } from "@lib/supabase";
import { InferGetStaticPropsType } from "next";

export const getStaticProps = async () => {
  let series = await getSeries();

  return {
    props: {
      series,
    },
    revalidate: 600,
  };
};

export default function SeriesList({
  series,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(series);

  return (
    <Layout>
      <div className="grid grid-cols-6 gap-6">
        {series.map((serie) => (
          <h1 key={serie.id}>{serie.name}</h1>
        ))}
      </div>
      {series.map((serie) => (
        <h1>{serie.name}</h1>
      ))}
    </Layout>
  );
}
