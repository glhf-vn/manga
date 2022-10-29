import { DateTime } from "luxon";
import { useRouter } from "next/router";
import { Kanit } from "@next/font/google";
import { isEmpty } from "lodash";

import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";

const kanit = Kanit({
  weight: "700",
});

export default function ArchiveList() {
  const lastMonth = DateTime.now().minus({ month: 1 });
  const thisMonth = DateTime.now();
  const nextMonth = DateTime.now().plus({ month: 1 });

  const router = useRouter();
  const path = router.query;

  const options = [
    {
      value: `${lastMonth.get("year")}/${lastMonth.get("month")}`,
      label: lastMonth.setLocale("vi").toFormat("MMMM"),
    },
    {
      value: `${thisMonth.get("year")}/${thisMonth.get("month")}`,
      label: thisMonth.setLocale("vi").toFormat("MMMM"),
    },
    {
      value: `${nextMonth.get("year")}/${nextMonth.get("month")}`,
      label: nextMonth.setLocale("vi").toFormat("MMMM"),
    },
  ];

  const pagedMonth = isEmpty(path) ? thisMonth.get("month") : path.month;

  return (
    <div
      className={`flex items-center gap-3 text-lg sm:text-xl md:text-2xl lg:text-3xl ${kanit.className}`}
    >
      <span>Lịch phát hành</span>
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center gap-3 rounded-2xl bg-zinc-200 py-1 px-2">
          tháng {pagedMonth}
          <BsChevronDown className="text-sm" />
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="absolute right-0 mt-3 w-full overflow-hidden rounded-2xl bg-zinc-200 shadow-lg">
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`block py-1 px-2 ${active && "bg-zinc-300"}`}
                  href={`/archive/${lastMonth.get("year")}/${lastMonth.get(
                    "month"
                  )}`}
                >
                  {lastMonth.setLocale("vi").toFormat("MMMM")}
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`block py-1 px-2 ${active && "bg-zinc-300"}`}
                  href={`/`}
                >
                  {thisMonth.setLocale("vi").toFormat("MMMM")}
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`block py-1 px-2 ${active && "bg-zinc-300"}`}
                  href={`/archive/${nextMonth.get("year")}/${nextMonth.get(
                    "month"
                  )}`}
                >
                  {nextMonth.setLocale("vi").toFormat("MMMM")}
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
