import Link from "next/link";
import { Kanit } from "@next/font/google";

import Layout from "@layouts/Layout";

const kanit = Kanit({
  weight: "700",
});

export default function Custom404() {
  return (
    <Layout>
      <div className="container flex h-screen items-center justify-center">
        <div className="text-center">
          <p>¯\_| ✖ 〜 ✖ |_/¯</p>
          <h1 className={`${kanit.className} text-9xl`}>404</h1>
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
