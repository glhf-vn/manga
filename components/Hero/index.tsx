import { Kanit } from "@next/font/google";

const kanit = Kanit({
  weight: "700",
});

export default function Hero({ children }) {
  return (
    <div className="mb-12 flex h-96 items-center justify-center bg-zinc-100">
      <h1 className={`container px-6 text-center text-4xl ${kanit.className}`}>
        {children}
      </h1>
    </div>
  );
}
