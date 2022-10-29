import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import { Kanit } from "@next/font/google";

const kanit = Kanit({
  weight: "700",
});

const imageStyles = cva("w-full h-full", {
  variants: {
    fit: {
      full: "object-cover",
    },
  },
});

const placeholderStyles = cva(
  `flex bg-zinc-200 p-6 text-zinc-500 aspect-[2/3] h-full w-full items-center justify-center text-center ${kanit.className}`,
  {
    variants: {
      hero: {
        true: "text-3xl",
        false: "text-xl",
      },
    },
    defaultVariants: {
      hero: false,
    },
  }
);

export interface CoverProps {
  entry: {
    name: string;
    image: string;
  };
}

export interface Props
  extends CoverProps,
    VariantProps<typeof imageStyles>,
    VariantProps<typeof placeholderStyles> {}

export default function Cover({ entry, hero, fit, ...props }: Props) {
  return (
    <>
      {entry.image ? (
        <Image
          className={imageStyles({ fit })}
          src={entry.image}
          alt={entry.name}
          width={400}
          height={600}
          {...props}
        />
      ) : (
        <div className={placeholderStyles({ hero })} {...props}>
          {entry.name}
        </div>
      )}
    </>
  );
}
