import Link from "next/link";
import { NextSeo } from "next-seo";

import Layout from "@layouts/Layout";

export default function Custom404() {
  return (
    <Layout>
      <NextSeo title="Không tìm thấy trang" />

      <div className="container mx-auto flex h-screen items-center justify-center px-3">
        <div className="text-center">
          <p>¯\_| ✖ 〜 ✖ |_/¯</p>
          <h1 className="font-kanit text-9xl font-bold">404</h1>
          <p>
            Oops, lỗi rồi... vì đường dẫn không tồn tại.
            <br />
            Về{" "}
            <Link className="font-bold text-primary" href="/" scroll={false}>
              trang chủ
            </Link>
            ?
          </p>
        </div>
      </div>
    </Layout>
  );
}
