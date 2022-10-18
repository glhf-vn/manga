import styles from "/styles/styles.module.scss";
import Layout from "/components/layout";
import Link from "next/link";
import { useRouter } from "next/router";

const pageTitle = "Light-novel Mới - Tiki Trading";
const pageDescription =
  "Xem light-novel mới phát hành chưa bao giờ là dễ hơn, nay được tổng hợp từ nhiều trang TMDT khác nhau!";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

var formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export async function getStaticPaths() {
  return {
    paths: [
      { params: { page: "1" } },
      { params: { page: "2" } },
      { params: { page: "3" } },
      { params: { page: "4" } },
      { params: { page: "5" } },
      { params: { page: "6" } },
      { params: { page: "7" } },
      { params: { page: "8" } },
      { params: { page: "9" } },
      { params: { page: "10" } },
    ],
    fallback: false, // false or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  console.log(params.page);
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
  const posts = await res.json();

  return {
    props: {
      params,
      posts,
    },
    revalidate: 360, // In seconds
  };
}

export default function TikiMangaListing({ params, posts }) {
  const router = useRouter();
  return (
    <Layout title={pageTitle} description={pageDescription}>
      <div className={`uk-container ${styles.main}`}>
        <h1 className={`uk-heading-line uk-margin-medium ${styles.title}`}>
          <span>Light-novel Mới - Tiki Trading</span>
        </h1>
        <div className="uk-margin-top" uk-grid="true">
          {posts.data.map((product) => {
            return (
              <div className="uk-width-1-2@s uk-width-1-3@m uk-width-1-4@l">
                <a
                  href={"https://tiki.vn/" + product.url_key + ".html"}
                  target="_blank"
                  key={product.id}
                >
                  <div className="uk-card uk-card-small uk-card-default uk-margin uk-card-hover">
                    <div className="uk-card-media-top">
                      <img
                        loading="lazy"
                        src={product.thumbnail_url}
                        alt={product.name}
                        className="uk-width-medium"
                      />
                    </div>
                    <div className="uk-card-body">
                      <h3 className="uk-card-title uk-margin-remove uk-text-default uk-text-bold">
                        {product.name}
                      </h3>
                      <p>
                        {product.original_price > product.price ? (
                          <>
                            <span className="uk-text-success">
                              {formatter.format(product.price)}
                            </span>{" "}
                            <span
                              className="uk-text-danger uk-text-small"
                              style={{ textDecoration: "line-through" }}
                            >
                              {formatter.format(product.original_price)}
                            </span>
                          </>
                        ) : (
                          <span className="uk-text-primary">
                            {formatter.format(product.price)}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
        <ul className="uk-pagination uk-flex-center">
          {params.page > 1 ? (
            <li>
              <a href={Number(params.page) - 1}>
                <span uk-pagination-previous="true"></span>
              </a>
            </li>
          ) : (
            <li className="uk-disabled">
              <a>
                <span uk-pagination-previous="true"></span>
              </a>
            </li>
          )}
          {Array.from({ length: 10 }, (_, i) => i + 1).map((key) => {
            return (
              <li className={params.page == key ? "uk-active" : ""}>
                <Link href={key.toString()} scroll={true}>
                  <a>{key}</a>
                </Link>
              </li>
            );
          })}
          {params.page < 10 ? (
            <li>
              <a href={Number(params.page) + 1}>
                <span uk-pagination-next="true"></span>
              </a>
            </li>
          ) : (
            <li className="uk-disabled">
              <a>
                <span uk-pagination-next="true"></span>
              </a>
            </li>
          )}
        </ul>
      </div>
    </Layout>
  );
}
