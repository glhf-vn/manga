import { BsHeartFill } from "react-icons/bs";

export default function Footer() {
  return (
    <div className="bg-zinc-800 text-gray-200">
      <div className="container mx-auto p-6">
        <span>
          &copy; catouberos, with{" "}
          <BsHeartFill className="inline text-red-400" />
        </span>
      </div>
    </div>
  );
}
