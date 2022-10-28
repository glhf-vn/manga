import {
  BsFacebook,
  BsTwitter,
  BsDiscord,
  BsGithub,
  BsArrowUp,
} from "react-icons/bs";

export default function Footer() {
  const handleClick = () => {
    document.getElementById("__next").scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <div className="container mx-auto mt-6 p-6">
      <hr className="mb-6 w-24 border-4 border-zinc-400" />
      <div className="flex justify-between">
        <div>
          <ul
            className="flex gap-3 text-2xl text-zinc-400"
            style={{ display: "flex" }}
          >
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
              className="transition-colors duration-100 ease-linear hover:text-[#161b22]"
            >
              <BsGithub />
            </a>
          </ul>
        </div>
        <div>
          <BsArrowUp onClick={handleClick} className="text-2xl text-zinc-400" />
        </div>
      </div>
    </div>
  );
}
