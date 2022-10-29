import { DateTime } from "luxon";
import { Kanit } from "@next/font/google";
import Select from "react-select";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";

const kanit = Kanit({
  weight: "700",
});

export default function ArchiveList() {
  const lastMonth = DateTime.now().minus({ month: 1 });
  const thisMonth = DateTime.now();
  const nextMonth = DateTime.now().plus({ month: 1 });

  const router = useRouter();
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

  const path = router.query;

  const selectCustomStyles = {
    container: (provided) => ({
      ...provided,
      display: "inline-block",
    }),
    control: () => ({
      display: "flex",
      border: "none",
      background: "#e4e4e7",
      borderRadius: "1rem",
    }),
    indicatorSeparator: () => ({}),
    menu: (provided) => ({
      ...provided,
      background: "#e4e4e7",
      borderRadius: "1rem",
      overflow: "hidden",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected
        ? "#f8b60b"
        : state.isFocused
        ? "#d4d4d8"
        : "unset",
      transition: "background ease 50ms",
    }),
  };

  return (
    <div
      className={`flex items-center gap-3 text-lg sm:text-xl md:text-2xl lg:text-3xl ${kanit.className}`}
    >
      <span>Lịch phát hành</span>
      <Select
        styles={selectCustomStyles}
        options={options}
        onChange={(e) => router.push(`/archive/${e.value}`)}
        isSearchable={false}
        value={
          isEmpty(path)
            ? {
                value: `${thisMonth.get("year")}/${thisMonth.get("month")}`,
                label: thisMonth.setLocale("vi").toFormat("MMMM"),
              }
            : {
                value: `${path.year}/${path.month}`,
                label: `tháng ${path.month}`,
              }
        }
      />
    </div>
  );
}
