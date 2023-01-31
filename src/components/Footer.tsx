import {
  BsFacebook,
  BsTwitter,
  BsDiscord,
  BsGithub,
  BsArrowUp,
} from "react-icons/bs";
import Link from "next/link";

export default function Footer() {
  const handleClick = () => {
    document.getElementById("__next")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto mt-6 p-6">
      <hr className="mb-6 w-24 border-4 border-zinc-400" />
      <div className="flex flex-col justify-between gap-6 sm:flex-row">
        <div>
          <ul className="flex gap-3 text-2xl text-zinc-400">
            <li>
              <a
                href="https://facebook.com/mangaglhf/"
                className="transition-colors duration-100 ease-linear hover:text-[#1877f2]"
                aria-label="Facebook"
              >
                <BsFacebook />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/mangaglhf/"
                className="transition-colors duration-100 ease-linear hover:text-[#1da1f2]"
                aria-label="Twitter"
              >
                <BsTwitter />
              </a>
            </li>
            <li>
              <a
                href="https://via.glhf.vn/discord"
                className="transition-colors duration-100 ease-linear hover:text-[#5865f2]"
                aria-label="Discord"
              >
                <BsDiscord />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/glhf-vn"
                className="transition-colors duration-100 ease-linear hover:text-[#161b22]"
                aria-label="GitHub"
              >
                <BsGithub />
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-row justify-end gap-6 text-zinc-400">
          <ul className="flex flex-row gap-6">
            <li>
              <a
                href="mailto:konnichiwa@glhf.vn"
                className="transition-all ease-linear hover:text-zinc-600"
              >
                Liên hệ
              </a>
            </li>
            <li>
              <Link
                href="/donate"
                className="transition-all ease-linear hover:text-zinc-600"
              >
                Ủng hộ
              </Link>
            </li>
          </ul>
          <BsArrowUp
            onClick={handleClick}
            className="cursor-pointer text-2xl transition-all ease-linear hover:text-zinc-600"
          />
        </div>
      </div>
    </div>
  );
}
