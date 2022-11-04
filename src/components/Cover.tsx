import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";

const cloudinaryLoader = ({ src, width, quality }) => {
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
    image: string;
    id: string;
  };
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
  sizes = "(max-width: 768px) 50vw, (max-width: 1024px) 75vw, 100vw",
}: Props) {
  return (
    <>
      {entry.image ? (
        <Image
          loader={cloudinaryLoader}
          className={imageStyles({ fit })}
          src={entry.id}
          alt={entry.name}
          width={400}
          height={600}
          priority={priority}
          sizes={sizes}
        />
      ) : (
        <div className={placeholderStyles({ hero })}>{entry.name}</div>
      )}
    </>
  );
}
