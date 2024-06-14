"use client";

import { ReactNode } from "react";
import { Caption } from "./caption";

type Props = {
  caption?: ReactNode;
  className?: string;
};

const WithCaption = ({
  caption,
  children,
  className,
}: React.PropsWithChildren<Props>) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
      {caption && <Caption>{caption}</Caption>}
    </div>
  );
};

export { WithCaption };
