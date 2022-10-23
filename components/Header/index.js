import Link from "next/link";
import Image from "next/image";
import { slide as Menu } from "react-burger-menu";
import { Squash as Hamburger } from "hamburger-react";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { BsFacebook, BsTwitter, BsDiscord, BsGithub } from "react-icons/bs";

export default function Headers() {
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMenuOpen(false); // Close the navigation panel on changing page
  }, [router.pathname]);

  return (
    <>
      {/* mobile menu */}
      <Menu
        isOpen={menuOpen}
        onStateChange={(state) => setMenuOpen(state.isOpen)}
        customBurgerIcon={false}
        width={"100%"}
        right
      >
        <Link href="/">
          <a className="bm-item">Lịch phát hành</a>
        </Link>
        <Link href="/license">
          <a className="bm-item">Thông tin bản quyền</a>
        </Link>
        <span className="bm-list-heading">Mua truyện mới</span>
        <ul className="bm-list">
          <li className="bm-list-item">
            <span className="bm-sublist-heading">Manga</span>
            <ul className="bm-sublist">
              <li className="bm-sublist-item">Tiki Trading</li>
              <li className="bm-sublist-item">FAHASA.com</li>
            </ul>
          </li>
          <li className="bm-list-item">
            <span className="bm-sublist-heading">Light-novel</span>
            <ul className="bm-sublist">
              <li className="bm-sublist-item">Tiki Trading</li>
              <li className="bm-sublist-item">FAHASA.com</li>
            </ul>
          </li>
        </ul>
        <Link href="/donate">
          <a className="bm-item">{"Ủng hộ <3"}</a>
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
      {/* logo */}
      <div className="fixed top-6 left-6 z-[1200]">
        <Link href="/" scroll={false}>
          <a>
            <Image
              layout="fixed"
              src="/img/logo_rzt5it.png"
              width={64}
              height={32}
              alt="GLHF logo"
            />
          </a>
        </Link>
      </div>
      {/* open menu on mobile */}
      <div className="fixed top-4 right-4 z-[1200] sm:hidden">
        <Hamburger
          size="24"
          toggled={menuOpen}
          toggle={() => setMenuOpen(!menuOpen)}
          color={menuOpen ? "white" : "black"}
          label="Mở menu"
          rounded
        />
      </div>
      {/* desktop menu */}
      <div className="absolute top-6 right-6 z-10 hidden sm:block">
        <ul className="flex gap-6 font-bold text-gray-500">
          <li>
            <Link href="/">
              <a
                className={
                  router.pathname.includes("/") ? "text-secondary" : ""
                }
              >
                Lịch phát hành
              </a>
            </Link>
          </li>
          <li>
            <Link href="/license">
              <a
                className={
                  router.pathname.includes("license") ? "text-secondary" : ""
                }
              >
                Bản quyền
              </a>
            </Link>
          </li>
          <li>
            <a>Truyện mới</a>
          </li>
        </ul>
      </div>
    </>
  );
}
