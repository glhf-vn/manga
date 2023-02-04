import { Dialog, Transition } from "@headlessui/react";
import { Fragment, type HTMLProps, type ReactNode } from "react";
import { BsXLg } from "react-icons/bs";

export interface ModalProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  isOpen: boolean;
  onClose(): void;
}

export default function Modal({
  children,
  isOpen,
  onClose,
}: ModalProps): JSX.Element {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative">
        <Transition.Child
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition ease-in duration-200"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0"
        >
          <div className="fixed inset-0 z-50 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 h-screen overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="flex min-h-full items-center justify-center p-6">
              <Dialog.Panel className="relative w-full max-w-[640px] overflow-hidden rounded-2xl bg-zinc-50 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-50">
                {children}

                <BsXLg
                  className="absolute top-3 right-3 cursor-pointer text-lg text-gray-500"
                  onClick={onClose}
                />
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
