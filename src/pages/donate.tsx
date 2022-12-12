import Link from "next/link";
import { NextSeo } from "next-seo";
import Image from "next/image";

import Layout from "@layouts/Layout";

import Header from "@components/Header";
import Button from "@components/Button";

export default function Donate() {
  return (
    <Layout>
      <NextSeo title="Ủng hộ phát triển" />

      <Header>Ủng hộ phát triển</Header>

      <div className="container mx-auto px-6">
        <h3 className="mb-3 font-kanit text-2xl font-bold">Hỗ trợ dự án</h3>
        <div className="mb-12">
          <Button
            href="https://me.momo.vn/catouberos"
            className="mr-3 bg-[#d82d8b] text-white dark:bg-[#d82d8b]"
          >
            <Image
              alt="MoMo logo"
              src="/img/momo-logo.png"
              width={20}
              height={20}
            />
            MoMo
          </Button>
          <Button
            href="https://social.zalopay.vn/mt-gateway/v1/private-qr?note=&receiver_id=190126000002776"
            className="text-bold mr-3 border border-[#efefef] bg-white text-zinc-800 dark:bg-white"
          >
            <Image
              alt="ZaloPay logo"
              src="/img/zalopay-logo.png"
              width={20}
              height={20}
            />
            ZaloPay
          </Button>
          <Button>Chuyển khoản</Button>
        </div>
        <p className="mb-6">
          <Link href="/" className="font-bold text-primary">
            manga.GLHF.vn
          </Link>{" "}
          được xây dựng là một dự án mã nguồn mở, hoàn toàn miễn phí để sử dụng
          và phát triển, đóng góp - qua đó, bạn có thể xem mã nguồn trên{" "}
          <a className="underline" href="https://github.com/catouberos/manga">
            trang GitHub
          </a>{" "}
          của dự án.
        </p>
        <p className="mb-6">
          Bên cạnh đó, việc ủng hộ dự án có thể tính vào hỗ trợ phát triển, điển
          hình như hỗ trợ chi phí lưu trữ cơ sở dữ liệu, máy chủ hình ảnh (CDN)
          và một số hoạt động khác.
        </p>
        <p className="mb-6">
          Lời cuối, cảm ơn bạn đã dùng, đã xem qua và đã chia sẻ về dự án.
        </p>
      </div>
    </Layout>
  );
}
