import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsXLg } from "react-icons/bs";

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({
  children,
  isOpen,
  onClose,
  ...props
}: ModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 z-[1300] bg-black/30"
            aria-hidden="true"
          />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 z-[1300] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-6">
              <Dialog.Panel className="relative w-full max-w-[640px] overflow-hidden rounded-2xl bg-white">
                {children}

                <BsXLg
                  className="absolute top-3 right-3 cursor-pointer text-lg text-gray-500"
                  onClick={onClose}
                />
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
