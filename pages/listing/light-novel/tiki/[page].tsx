import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import Layout from "@layouts/Layout";

import Card from "@components/Card";
import Header from "@components/Header";
import Badge from "@components/Badge";
import Button from "@components/Button";

export async function getStaticPaths() {
  return {
    paths: [...Array(10)].map((e, i) => ({
      params: {
        page: (++i).toString(),
      },
    })),
    fallback: false, // false or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://tiki.vn/api/personalish/v1/blocks/listings?limit=24&category=7358&page=${params.page}&sort=newest&seller=1&urlKey=truyen-tranh`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:100.0) Gecko/20100101 Firefox/100.0",
      },
      method: "GET",
    }
  );
  const products = await res.json();

  return {
    props: {
      params,
      products: products.data,
    },
    revalidate: 360, // In seconds
  };
}

export default function TikiLNListing({ params, products }) {
  const router = useRouter();
  const path = router.query;
  const currencyFormatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  console.log();

  return (
    <Layout>
      <Header>Light-novel/Tiki Trading</Header>
      <div className="container mx-auto px-6">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.id} className="relative">
              <Card>
                <a
                  href={`https://tiki.vn/${product.url_key}.html`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {product.discount != 0 && (
                    <div className="absolute top-1 right-1">
                      <Badge intent="success">
                        -
                        {Math.round(
                          (product.discount / product.original_price) * 100
                        )}
                        %
                      </Badge>
                    </div>
                  )}
                  <Image
                    src={product.thumbnail_url}
                    alt={product.name}
                    width={280}
                    height={280}
                    className="h-full w-full"
                  />
                  <div className="p-6 font-bold">
                    <h3>{product.name}</h3>
                    <p className="mt-3">
                      {product.original_price > product.price ? (
                        <>
                          <span className="text-green-400">
                            {currencyFormatter.format(product.price)}
                          </span>{" "}
                          <span className="text-sm text-red-400 line-through">
                            {currencyFormatter.format(product.original_price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-primary">
                          {currencyFormatter.format(product.price)}
                        </span>
                      )}
                    </p>
                  </div>
                </a>
              </Card>
            </li>
          ))}
        </ul>
        <ul className="mt-6 text-center">
          {/* TODO: pagination element */}
          {[...Array(10)].map((e, i) => {
            const index = ++i;
            return (
              <li key={index} className="mx-0.5 inline-block">
                <Button
                  intent={path.page == index.toString() ? "primary" : "none"}
                  hoverable={false}
                >
                  <Link href={index.toString()}>{index}</Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}
