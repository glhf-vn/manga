import { cva, type VariantProps } from "class-variance-authority";
import Image, { type ImageLoaderProps, type ImageProps } from "next/image";

const cloudinaryLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://res.cloudinary.com/glhfvn/image/upload/c_scale,w_${width}/q_${
    quality || 80
  }/f_auto/covers/${src}.jpg`;
};

const imageStyles = cva("w-full h-full", {
  variants: {
    fit: {
      full: "object-cover",
    },
  },
});

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
    VariantProps<typeof imageStyles>,
    VariantProps<typeof placeholderStyles>,
    Omit<ImageProps, "src" | "alt"> {}

export default function Cover({
  entry,
  hero,
  fit,
  useLoader = true,
  sizes = "(max-width: 768px) 50vw, (max-width: 1024px) 75vw, 100vw",
  ...props
}: Props) {
  if (entry.image_url) {
    if (useLoader) {
      return (
        <Image
          loader={cloudinaryLoader}
          className={imageStyles({ fit })}
          src={entry.id as string}
          alt={entry.name}
          width={300}
          height={450}
          sizes={sizes}
          {...props}
        />
      );
    } else {
      return (
        <Image
          className={imageStyles({ fit })}
          src={entry.image_url}
          alt={entry.name}
          unoptimized={true}
          width={300}
          height={450}
          sizes={sizes}
          {...props}
        />
      );
    }
  } else {
    return <div className={placeholderStyles({ hero })}>{entry.name}</div>;
  }
}
