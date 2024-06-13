import { ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  // TaiLwind prefix
  prefix: "tw-",
});

/**
 * Tailwind classnames utility
 *
 * It will merge all the classnames and return a string
 *
 *
 * @param inputs
 * @returns
 * @example
 * cn('flex', 'flex-col', 'justify-center', 'items-center')
 * // => 'flex flex-col justify-center items-center'
 **/
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
