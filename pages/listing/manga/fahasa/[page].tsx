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
    `https://fahasa.com/fahasa_catalog/product/loadproducts?category_id=6718&currentPage=${params.page}&limit=24&order=created_at&series_type=0`,
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
      products: products.product_list,
    },
    revalidate: 360, // In seconds
  };
}

export default function FahasaMangaListing({ params, products }) {
  const router = useRouter();
  const path = router.query;
  const currencyFormatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  console.log();

  return (
    <Layout>
      <Header>Manga/FAHASA.com</Header>
      <div className="container mx-auto px-6">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.product_id} className="relative">
              <Card>
                <a href={product.product_url} target="_blank" rel="noreferrer">
                  {product.discount != 0 && (
                    <div className="absolute top-1 right-1">
                      <Badge intent="success">-{product.discount}%</Badge>
                    </div>
                  )}
                  <Image
                    src={product.image_src}
                    alt={product.product_name}
                    width={280}
                    height={280}
                    className="h-full w-full"
                  />
                  <div className="p-6 font-bold">
                    <h3>{product.product_name}</h3>
                    <p className="mt-3">
                      {product.product_price > product.product_finalprice ? (
                        <>
                          <span className="text-green-400">
                            {currencyFormatter.format(
                              product.product_finalprice * 1000
                            )}
                          </span>{" "}
                          <span className="text-sm text-red-400 line-through">
                            {currencyFormatter.format(
                              product.product_price * 1000
                            )}
                          </span>
                        </>
                      ) : (
                        <span className="text-primary">
                          {currencyFormatter.format(
                            product.product_finalprice * 1000
                          )}
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
