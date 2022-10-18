import styles from "../styles/styles.module.scss";
import Layout from "../components/layout";
import Link from "next/link";

const pageTitle = "Không tìm thấy trang";
const pageDescription = "Không tìm thấy trang...";

export default function Custom404() {
  return (
    <Layout title={pageTitle} description={pageDescription}>
      <div className={`uk-container ${styles.main}`}>
        <h1 className={`uk-text-center uk-margin-medium ${styles.title}`}>
          <span>404</span>
        </h1>
        <h2 className={`uk-text-center uk-margin-medium ${styles.title}`}>
          <span>¯\_| ✖ 〜 ✖ |_/¯</span>
        </h2>
        <div className={`uk-text-center`}>
          Oops, lỗi rồi... Bạn hãy kiểm tra lại đường dẫn, hay bạn muốn về{" "}
          <Link href="/" scroll={false}>
            <a>trang chủ</a>
          </Link>
          ?
        </div>
      </div>
    </Layout>
  );
}
