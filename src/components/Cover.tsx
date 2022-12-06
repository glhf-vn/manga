import { cva, type VariantProps } from "class-variance-authority";
import Image, { type ImageLoaderProps } from "next/image";

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
  `flex bg-zinc-200 p-6 text-zinc-500 aspect-[2/3] h-full w-full items-center justify-center text-center font-kanit font-bold`,
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
    id: string;
  };
  loader?: boolean;
  priority?: boolean;
  sizes?: string;
}

export interface Props
  extends CoverProps,
    VariantProps<typeof imageStyles>,
    VariantProps<typeof placeholderStyles> {}

export default function Cover({
  entry,
  hero,
  fit,
  priority = true,
  loader = true,
  sizes = "(max-width: 768px) 50vw, (max-width: 1024px) 75vw, 100vw",
}: Props) {
  if (entry.image_url) {
    if (loader) {
      return (
        <Image
          loader={cloudinaryLoader}
          className={imageStyles({ fit })}
          src={entry.id}
          alt={entry.name}
          width={300}
          height={450}
          priority={priority}
          sizes={sizes}
        />
      );
    } else {
      return (
        <Image // : entry.image_url}
          className={imageStyles({ fit })}
          src={entry.image_url}
          alt={entry.name}
          unoptimized={true}
          width={300}
          height={450}
          priority={priority}
          sizes={sizes}
        />
      );
    }
  } else {
    return <div className={placeholderStyles({ hero })}>{entry.name}</div>;
  }
}
