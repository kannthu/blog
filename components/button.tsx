import { ElementType, forwardRef, Ref } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Props } from "./componentTypeHelpers";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "tw-inline-flex tw-items-center tw-no-underline tw-justify-center tw-rounded-lg tw-text-md tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none tw-ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "tw-bg-primary tw-text-white visited:tw-text-white hover:tw-bg-[#cd2d48] disabled:tw-opacity-50 disabled:tw-cursor-not-allowed",
        dark: "tw-bg-gray-900 tw-text-white visited:tw-text-white hover:tw-bg-gray-700 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed",
        destructive:
          "tw-bg-red-600 tw-text-white visited:tw-text-white hover:tw-bg-red-700 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed",
        success:
          "tw-bg-green-600 tw-text-white visited:tw-text-white hover:tw-bg-green-700 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed",
        outline:
          "tw-border tw-border-input hover:tw-bg-gray-200 tw-text-gray-900 visited:tw-text-gray-900 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed",
        secondary:
          "tw-bg-gray-100 hover:tw-bg-gray-200 tw-text-gray-700 visited:tw-text-gray-700 hover:tw-text-gray-800 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed",
        ghost:
          "tw-text-gray-900 hover:tw-text-gray-700 visited:tw-text-gray-900 hover:tw-bg-gray-200 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed",
        light:
          "tw-bg-white tw-text-gray-900 visited:tw-text-gray-900 hover:tw-bg-gray-200 disabled:tw-bg-gray-50 disabled:tw-cursor-not-allowed",
        link: "tw-underline-offset-4 hover:tw-underline tw-text-gray-700 visited:tw-text-gray-900",
      },
      size: {
        sm: "tw-py-0.5 tw-px-2 tw-text-sm tw-rounded-md",
        default: "tw-py-1.5 tw-px-4",
        lg: "tw-py-3 tw-px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>["variant"];

export type ButtonProps<TTag extends ElementType = "button"> = Props<
  TTag,
  never,
  never,
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    className?: string;
  }
>;

const BaseButton = <TTag extends ElementType = "button">(
  {
    className,
    variant,
    size,
    asChild = false,
    as,
    ...props
  }: ButtonProps<TTag>,
  ref: Ref<HTMLButtonElement>
) => {
  const Comp = asChild ? Slot : as ?? "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
};

BaseButton.displayName = "BaseButton";

type ButtonComponent = {
  <TTag extends ElementType = "button">(props: ButtonProps<TTag>): JSX.Element;
};

let Button = forwardRef(BaseButton) as unknown as ButtonComponent;

export { Button, buttonVariants };
