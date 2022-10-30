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
          <Popover className="relative">
            <Popover.Button>Truyện mới</Popover.Button>

            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel className="absolute right-0 mt-3 w-fit overflow-hidden rounded-2xl bg-zinc-200 font-normal shadow-lg">
                <div className="flex flex-col py-1">
                  <span className="mt-2 whitespace-nowrap px-4 py-1 font-bold uppercase">
                    Manga
                  </span>
                  <Link className="px-4 py-1" href="/listing/manga/tiki/1">
                    Tiki Trading
                  </Link>
                  <Link className="px-4 py-1" href="/listing/manga/fahasa/1">
                    FAHASA.com
                  </Link>
                  <span className="mt-2 whitespace-nowrap px-4 py-1 font-bold uppercase">
                    Light-novel
                  </span>
                  <Link
                    className="px-4 py-1"
                    href="/listing/light-novel/tiki/1"
                  >
                    Tiki Trading
                  </Link>
                  <Link
                    className="px-4 py-1"
                    href="/listing/light-novel/fahasa/1"
                  >
                    FAHASA.com
                  </Link>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </li>
      </ul>
    </div>
  );
}
