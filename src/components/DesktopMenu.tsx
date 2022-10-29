import { useRouter } from "next/router";
import Link from "next/link";

export default function DesktopMenu() {
  const router = useRouter();

  return (
    <div className="absolute top-6 right-6 z-10 hidden sm:block">
      <ul className="flex gap-6 font-bold text-gray-500">
        <li>
          <Link
            href="/"
            className={router.pathname == "/" ? "text-secondary" : ""}
          >
            Lịch phát hành
          </Link>
        </li>
        <li>
          <Link
            href="/license"
            className={
              router.pathname.includes("license") ? "text-secondary" : ""
            }
          >
            Bản quyền
          </Link>
        </li>
        <li>
          <a>Truyện mới</a>
        </li>
      </ul>
    </div>
  );
}
