import { BsChevronDoubleRight } from "react-icons/bs";

export const TopAlert = () => (
  <>
    <div className="hidden bg-[#89C4F4] py-2 dark:bg-[#4F98D3] sm:block">
      <a href="https://tana.moe/">
        <div className="container mx-auto px-6">
          mangaGLHF đang trở thành{" "}
          <span className="font-bold underline decoration-2">Tana.moe</span> -
          một phiên bản mới và hiện đại hơn.{" "}
          <BsChevronDoubleRight className="inline" />
        </div>
      </a>
    </div>
  </>
);
