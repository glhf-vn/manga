import { Kanit } from "@next/font/google";

const kanit = Kanit({
  weight: "700",
});

export default function Cover({ entry, hero = false, fit = "fit" }) {
  return (
    <div className={`${fit == "h-fit" ? "h-fit" : "h-full"} w-full`}>
      {entry.image ? (
        <img
          className={`${
            fit == "h-fit" ? "h-fit" : "h-full object-cover"
          } w-full`}
          src={entry.image}
          alt={entry.name}
        />
      ) : (
        <div
          className={`flex bg-zinc-200 p-6 text-zinc-500 ${
            hero ? "text-3xl" : "text-xl"
          } aspect-[2/3] h-full w-full items-center justify-center text-center ${
            kanit.className
          }`}
        >
          <span>{entry.name}</span>
        </div>
      )}
    </div>
  );
}
