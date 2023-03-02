import type { FilterModalProps } from "@data/index.types";

import { useState } from "react";

import { BsFilter } from "react-icons/bs";
import { Dialog } from "@headlessui/react";

import Button from "@components/Button";
import Modal from "@components/Modal";

const FilterModal = ({ values, checkedValues, handler }: FilterModalProps) => {
  const [isOpen, setOpen] = useState(false);
  const [currentValues, setCurrentValues] = useState<string[]>(checkedValues);

  const changeCurrentValues = (checked: boolean, filterId: string) => {
    if (!checked) {
      // if uncheck
      setCurrentValues(currentValues.filter((value) => value != filterId)); //remove filterId from array
    } else {
      setCurrentValues([...currentValues, filterId]); // add filterId to array
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setOpen((status) => !status)}>
        <Dialog.Title className="m-6 font-kanit text-2xl font-bold lg:text-3xl">
          Lọc theo nhà xuất bản/phát hành
        </Dialog.Title>
        <Dialog.Description as="div" className="m-6">
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            <Button
              intent="secondary"
              hoverable={false}
              className="mb-3"
              onClick={() =>
                setCurrentValues([...values.map((value) => value.id)])
              }
            >
              Chọn tất cả
            </Button>
            <Button
              intent="none"
              className="mb-3"
              hoverable={false}
              onClick={() => setCurrentValues([])}
            >
              Bỏ chọn tất cả
            </Button>
            {values.map((value) => (
              <div key={value.id} className="flex items-center">
                <input
                  id={value.id}
                  checked={currentValues.includes(value.id)}
                  style={{ color: value.color }}
                  type="checkbox"
                  className={`h-4 w-4 rounded border-gray-300 transition-all focus:ring-zinc-400`}
                  onChange={({ target }) =>
                    changeCurrentValues(target.checked, value.id)
                  }
                />
                <label
                  htmlFor={`${value.id}`}
                  className="ml-3 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  {value.name}
                </label>
              </div>
            ))}
          </div>
          <Button
            onClick={() => handler(currentValues)}
            intent={currentValues != checkedValues ? "primary" : "secondary"}
            className="mt-3 w-full font-bold"
          >
            Lọc
          </Button>
        </Dialog.Description>
      </Modal>

      <Button
        className="flex-1 text-2xl"
        onClick={() => setOpen((status) => !status)}
        aria-label="Mở bộ lọc"
        role="button"
        intent="secondary"
      >
        <BsFilter />
      </Button>
    </>
  );
};

export default FilterModal;
