import styles from "/styles/styles.module.scss";
import Layout from "/components/layout";
import useSWR from "swr";
import { useState } from "react";

const pageTitle = "Light-novel Mới - Fahasa";
const pageDescription =
  "Xem light-novel mới phát hành chưa bao giờ là dễ hơn, nay được tổng hợp từ nhiều trang TMDT khác nhau!";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

var formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

function Fahasa({ index }) {
  const { data, error } = useSWR(
    `https://cdn0.fahasa.com/fahasa_catalog/product/loadproducts?category_id=5981&currentPage=${index}&limit=24&order=created_at&series_type=0`,
    (url) =>
      fetcher(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64; rv:100.0) Gecko/20100101 Firefox/100.0",
        },
        method: "GET",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      })
  );

  if (error) return <div>Error</div>;
  if (!data)
    return (
      <div className="uk-width-1-1 uk-text-center">
        <span
          className="uk-margin-auto-left uk-margin-auto-right"
          uk-spinner="ratio: 2"
        ></span>
      </div>
    );

  return (
    <>
      {data.product_list.map((product) => {
        return (
          <div className="uk-width-1-2@s uk-width-1-3@m uk-width-1-4@l">
            <a href={product.product_url} target="_blank">
              <div className="uk-card uk-card-small uk-card-default uk-margin uk-card-hover">
                <div className="uk-card-media-top">
                  <img
                    loading="lazy"
                    src={product.image_src}
                    alt={product.product_name}
                    className="uk-width-medium"
                  />
                </div>
                <div className="uk-card-body">
                  <h3 className="uk-card-title uk-margin-remove uk-text-default uk-text-bold">
                    {product.product_name}
                  </h3>
                  <p>
                    {product.product_price > product.product_finalprice ? (
                      <>
                        <span className="uk-text-success">
                          {formatter.format(product.product_finalprice * 1000)}
                        </span>{" "}
                        <span
                          className="uk-text-danger uk-text-small"
                          style={{ textDecoration: "line-through" }}
                        >
                          {formatter.format(product.product_price * 1000)}
                        </span>
                      </>
                    ) : (
                      <span className="uk-text-primary">
                        {formatter.format(product.product_finalprice * 1000)}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </a>
          </div>
        );
      })}
    </>
  );
}

export default function FahasaLightNovelListing() {
  const [pageIndex, setPageIndex] = useState(1);
  return (
    <Layout title={pageTitle} description={pageDescription}>
      <div className={`uk-container ${styles.main}`}>
        <h1 className={`uk-heading-line uk-margin-medium ${styles.title}`}>
          <span>Light-novel Mới - Fahasa</span>
        </h1>
        <div className="uk-margin-top" uk-grid="true">
          <Fahasa index={pageIndex} />
          <div style={{ display: "none" }}>
            <Fahasa index={pageIndex + 1} />
          </div>
        </div>
        <ul className="uk-pagination">
          {pageIndex > 1 ? (
            <li className="uk-margin-small-right">
              <a onClick={() => setPageIndex(pageIndex - 1)}>
                <span
                  className="uk-margin-small-right"
                  uk-pagination-previous="true"
                ></span>{" "}
                Trước
              </a>
            </li>
          ) : (
            ""
          )}
          <li className="uk-margin-auto-left">
            <a onClick={() => setPageIndex(pageIndex + 1)}>
              Sau{" "}
              <span
                className="uk-margin-small-left"
                uk-pagination-next="true"
              ></span>
            </a>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
