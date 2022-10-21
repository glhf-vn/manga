import Link from "next/link";
import Image from "next/image";
import { stack as Menu } from "react-burger-menu";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { BsList } from "react-icons/bs";

export default function Headers() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { pathname } = useRouter().pathname;

  useEffect(() => {
    setMenuOpen(false); // Close the navigation panel
  }, [pathname]);

  return (
    <>
      <Menu
        isOpen={menuOpen}
        onStateChange={(state) => setMenuOpen(state.isOpen)}
        customBurgerIcon={false}
        width={"100%"}
        right
      >
        <Link href="/">
          <a class="bm-item">Lịch phát hành</a>
        </Link>
        <Link href="/index1">
          <a class="bm-item">Thông tin bản quyền</a>
        </Link>
      </Menu>
      <div className="fixed top-6 left-6 z-[10000]">
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
      <div className="sm:hidden fixed top-6 right-6 z-[10000] h-[32px] w-[32px]">
        <BsList
          class="h-[32px] w-[32px]"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>
      <div className="hidden sm:block absolute top-6 right-6 z-10">
        <ul className="flex gap-6 font-bold text-gray-500">
          <li>
            <Link href="/license">
              <a>Bản quyền</a>
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
