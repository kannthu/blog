import { Caption } from "./caption";
import NextImage from "next/image";

export async function Image({
  src,
  alt: originalAlt,
  width,
  height,
}: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}) {
  return (
    <span className="my-5 flex flex-col items-center">
      <NextImage
        width={0}
        height={0}
        alt={originalAlt ?? ""}
        className="shadow rounded-lg"
        src={src}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }} // optional
      />

      {originalAlt && <Caption>{originalAlt}</Caption>}
    </span>
  );
}
