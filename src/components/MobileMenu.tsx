import { BsFacebook, BsTwitter, BsDiscord, BsGithub } from "react-icons/bs";
import { slide as Menu } from "react-burger-menu";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Squash as Hamburger } from "hamburger-react";

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

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
          Lịch phát hành{" "}
        </Link>
        <Link href="/license" className={`bm-item font-kanit`}>
          Thông tin bản quyền{" "}
        </Link>
        <Link href="/listing" className={`bm-item font-kanit`}>
          Mua truyện mới{" "}
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
      <div className="fixed top-4 right-4 z-[1200] sm:hidden">
        <Hamburger
          size={24}
          toggled={menuOpen}
          toggle={() => setMenuOpen(!menuOpen)}
          color={menuOpen ? "white" : "black"}
          label="Mở menu"
          rounded
        />
      </div>
    </>
  );
}
