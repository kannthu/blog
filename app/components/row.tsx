import { PropsWithChildren } from "react";

type RowProps = {
  className?: string;
};

const Row = ({ children, className }: PropsWithChildren<RowProps>) => {
  return (
    <div className={`tw-flex tw-w-full tw-flex-row ${className ?? ""}`}>
      {children}
    </div>
  );
};

export { Row };
