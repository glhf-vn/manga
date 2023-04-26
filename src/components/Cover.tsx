import { cva, type VariantProps } from "class-variance-authority";
import Image, { type ImageProps } from "next/image";
import { imageLoader } from "@data/config";

const placeholderStyles = cva(
  `flex bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-400 p-6 text-zinc-500 aspect-[2/3] h-full w-full items-center justify-center text-center font-kanit font-bold`,
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
    image_url: string | null;
    id: string | number;
  };
  useLoader?: boolean;
}

export interface Props
  extends CoverProps,
    VariantProps<typeof placeholderStyles>,
    Omit<ImageProps, "src" | "alt"> {}

export default function Cover({
  entry,
  hero,
  sizes = "(max-width: 768px) 40vw, (max-width: 1024px) 300px, 200px",
  ...props
}: Props) {
  if (entry.image_url) {
    return (
      <Image
        loader={imageLoader}
        className="aspect-[2/3] h-full w-full object-cover"
        src={entry.image_url}
        alt={entry.name}
        width={300}
        height={450}
        sizes={sizes}
        {...props}
      />
    );
  } else {
    return <div className={placeholderStyles({ hero })}>{entry.name}</div>;
  }
}
