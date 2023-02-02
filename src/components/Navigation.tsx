import { useRouter } from "next/router";
import { useState, useEffect, Fragment } from "react";

import Link from "next/link";
import Image from "next/image";
import {
  BsFacebook,
  BsTwitter,
  BsDiscord,
  BsGithub,
  BsList,
  BsX,
} from "react-icons/bs";
import { Dialog, Transition } from "@headlessui/react";

const MobileMenu = () => {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false); // Close the navigation panel on changing page
  }, [router.pathname]);

  return (
    <>
      <Transition show={menuOpen} as={Fragment}>
        <Dialog onClose={() => setMenuOpen(false)} className="relative z-50">
          <div className="fixed inset-0 z-[1300] flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="transition duration-500 ease-in-out"
              enterFrom="transform translate-x-full"
              enterTo="transform translate-x-0"
              leave="transition duration-500 ease-in-out"
              leaveFrom="transform translate-x-0"
              leaveTo="transform translate-x-full"
            >
              <Dialog.Panel className="min-h-screen w-full bg-zinc-800">
                <div
                  onClick={() => setMenuOpen(false)}
                  className="fixed top-6 right-6 z-20 cursor-pointer text-3xl text-zinc-50 sm:hidden"
                >
                  <BsX />
                </div>
                <div className="px-6 pt-20 text-gray-200">
                  <Link href="/" className="mb-3 block font-kanit text-2xl">
                    Lịch phát hành
                  </Link>
                  <Link
                    href="/license"
                    className="mb-3 block font-kanit text-2xl"
                  >
                    Thông tin bản quyền
                  </Link>
                  <Link
                    href="/listing"
                    className="mb-3 block font-kanit text-2xl"
                  >
                    Mua truyện mới
                  </Link>
                  <Link
                    href="/donate"
                    className="mb-3 block font-kanit text-2xl"
                  >
                    {"Ủng hộ <3"}
                  </Link>
                  <hr className="my-6 w-12 border-4 border-zinc-400" />
                  <ul className="flex gap-3 text-xl text-zinc-400">
                    <a
                      href="https://facebook.com/mangaglhf/"
                      className="transition-colors duration-100 ease-linear hover:text-[#1877f2]"
                    >
                      <BsFacebook />
                    </a>
                    <a
                      href="https://twitter.com/mangaglhf/"
                      className="transition-colors duration-100 ease-linear hover:text-[#1da1f2]"
                    >
                      <BsTwitter />
                    </a>
                    <a
                      href="https://via.glhf.vn/discord"
                      className="transition-colors duration-100 ease-linear hover:text-[#5865f2]"
                    >
                      <BsDiscord />
                    </a>
                    <a
                      href="https://github.com/glhf"
                      className="transition-colors duration-100 ease-linear hover:text-[#ffffff] dark:hover:text-[#f0f6fc]"
                    >
                      <BsGithub />
                    </a>
                  </ul>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* open menu on mobile */}
      <div
        className="fixed top-6 right-6 z-20 cursor-pointer text-3xl text-zinc-800 dark:text-zinc-50 sm:hidden"
        onClick={() => setMenuOpen(true)}
      >
        <BsList />
      </div>
    </>
  );
};

const DesktopMenu = () => {
  const router = useRouter();

  return (
    <div className="absolute top-6 right-6 z-10 hidden sm:block">
      <ul className="flex font-bold text-zinc-500">
        <li>
          <Link
            href="/"
            className={`${
              router.pathname == "/" || router.pathname.includes("archive")
                ? "text-primary"
                : "transition-colors duration-100 ease-linear hover:text-zinc-700"
            } p-3`}
          >
            Lịch phát hành
          </Link>
        </li>
        <li>
          <Link
            href="/license"
            className={`${
              router.pathname.includes("license")
                ? "text-primary"
                : "transition-colors duration-100 ease-linear hover:text-zinc-700"
            } p-3`}
          >
            Bản quyền
          </Link>
        </li>
        <li>
          <Link
            href="/listing"
            className={`${
              router.pathname.includes("listing")
                ? "text-primary"
                : "transition-colors duration-100 ease-linear hover:text-zinc-700"
            } p-3`}
          >
            Truyện mới
          </Link>
        </li>
        <li>
          <Link
            href="/donate"
            className={`${
              router.pathname.includes("donate")
                ? "text-primary"
                : "transition-colors duration-100 ease-linear hover:text-zinc-700"
            } p-3`}
          >
            Ủng hộ
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default function Navigation() {
  return (
    <>
      {/* logo */}
      <div className="fixed top-6 left-6 z-[1200]">
        <Link href="/" scroll={false}>
          <Image src="/img/logo.png" width={64} height={32} alt="GLHF logo" />
        </Link>
      </div>

      <MobileMenu />

      <DesktopMenu />
    </>
  );
}
