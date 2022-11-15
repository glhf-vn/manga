import { cva, type VariantProps } from "class-variance-authority";
import { useState, type HTMLProps, type ReactNode, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { usePopper } from "react-popper";

const cardStyles = cva("h-fit rounded-2xl shadow-md bg-zinc-100", {
  variants: {
    intent: {
      primary: "shadow-zinc-200",
      success: "shadow-green-200",
      error: "shadow-red-200",
      caution: "shadow-orange-200",
    },
    hoverable: {
      true: "hover:shadow-lg transition-shadow duration-150 ease-linear",
    },
    clickable: {
      true: "cursor-pointer",
      false: "overflow-hidden",
    },
  },
  defaultVariants: {
    intent: "primary",
    hoverable: true,
    clickable: false,
  },
});

export interface CardProps
  extends VariantProps<typeof cardStyles>,
    HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  entry?: {
    name: string;
    price: string;
    publisher: string;
  };
}

export default function Card({
  intent,
  hoverable,
  clickable,
  children,
  entry,
  ...props
}: CardProps): JSX.Element {
  const [isOpen, setOpen] = useState(false);

  let [referenceElement, setReferenceElement] = useState(null);
  let [popperElement, setPopperElement] = useState(null);
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 24],
        },
      },
    ],
  });

  return (
    <div className={cardStyles({ intent, hoverable, clickable })} {...props}>
      {clickable ? (
        <Popover className="relative h-fit">
          <button
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className="block overflow-hidden rounded-2xl"
            ref={setReferenceElement}
          >
            {children}
          </button>

          <Transition
            show={isOpen}
            as={Fragment}
            enter="transition duration-75 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel
              className="z-10 h-fit w-72 rounded-2xl bg-zinc-200 p-6 text-zinc-800 shadow-md"
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              <h3 className="mb-3 font-kanit text-2xl font-bold">
                {entry.name}
              </h3>
              <p>
                <b>Giá dự kiến</b>: {entry.price}
              </p>
            </Popover.Panel>
          </Transition>
        </Popover>
      ) : (
        children
      )}
    </div>
  );
}
