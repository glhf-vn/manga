import type { PaginationProps } from "@data/index.types";

import { DateTime } from "luxon";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import Button from "@components/Button";

const Pagination = ({ date, options }: PaginationProps) => {
  const timeObj = DateTime.fromObject({
    year: date.year,
    month: date.month,
  });
  const { changeDate } = options;

  const prevMonth = timeObj.minus({ month: 1 });
  const nextMonth = timeObj.plus({ month: 1 });

  return (
    <div className="flex justify-between">
      <Button
        intent="secondary"
        onClick={() =>
          changeDate({ year: prevMonth.year, month: prevMonth.month })
        }
      >
        <BsChevronLeft /> Trước
      </Button>

      <Button
        intent="primary"
        onClick={() =>
          changeDate({ year: nextMonth.year, month: nextMonth.month })
        }
      >
        Sau <BsChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
