import Link from "next/link";
import Image from "next/image";

import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

export default function Headers() {
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
