import { useRouter } from "next/router";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";

export default function DesktopMenu() {
  const router = useRouter();

  return (
    <div className="absolute top-6 right-6 z-10 hidden sm:block">
      <ul className="flex gap-6 font-bold text-gray-500">
        <li>
          <Link
            href="/"
            className={router.pathname == "/" ? "text-primary" : ""}
          >
            Lịch phát hành
          </Link>
        </li>
        <li>
          <Link
            href="/license"
            className={
              router.pathname.includes("license") ? "text-primary" : ""
            }
          >
            Bản quyền
          </Link>
        </li>
        <li>
          <Link
            href="/listing"
            className={
              router.pathname.includes("listing") ? "text-primary" : ""
            }
          >
            Truyện mới
          </Link>
        </li>
      </ul>
    </div>
  );
}
