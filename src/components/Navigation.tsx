import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { BsFacebook, BsTwitter, BsDiscord, BsGithub } from "react-icons/bs";
import { slide as Menu } from "react-burger-menu";
import { Squash as Hamburger } from "hamburger-react";

const MobileMenu = () => {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false); // Close the navigation panel on changing page
  }, [router.pathname]);

  return (
    <>
      <Menu
        isOpen={menuOpen}
        onStateChange={(state) => setMenuOpen(state.isOpen)}
        customBurgerIcon={false}
        width={"100%"}
        right
      >
        <Link href="/" className={`bm-item font-kanit`}>
          Lịch phát hành
        </Link>
        <Link href="/license" className={`bm-item font-kanit`}>
          Thông tin bản quyền
        </Link>
        <Link href="/listing" className={`bm-item font-kanit`}>
          Mua truyện mới
        </Link>
        <Link href="/donate" className={`bm-item font-kanit`}>
          {"Ủng hộ <3"}
        </Link>
        <hr className="bm-divider w-12 border-4 border-zinc-400" />
        <ul className="bm-social" style={{ display: "flex" }}>
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
            className="transition-colors duration-100 ease-linear hover:text-[#ffffff]"
          >
            <BsGithub />
          </a>
        </ul>
      </Menu>

      {/* open menu on mobile */}
      <div
        className={`fixed top-4 right-4 z-[1200] sm:hidden ${
          menuOpen ? "text-zinc-50" : "text-zinc-800 dark:text-zinc-50"
        }`}
      >
        <Hamburger
          size={24}
          toggled={menuOpen}
          toggle={() => setMenuOpen(!menuOpen)}
          label="Mở menu"
          rounded
        />
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
