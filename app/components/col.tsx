import { PropsWithChildren } from 'react';

type RowProps = {
  className?: string;
  base?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

let numberToFlexBasis = (number: number | 'auto') => {
  if (number === 'auto') {
    return `tw-basis-auto`;
  }

  if (number === 12) {
    return `tw-basis-full`;
  }

  return `tw-basis-${number}/12`;
};

const Col = ({
  children,
  className,
  sm,
  md,
  lg,
  xl,
  base,
  onMouseEnter,
  onMouseLeave,
}: PropsWithChildren<RowProps> = {
  // sm: 12,
  // md: 12,
  // lg: 12,
  // xl: 12,
}) => {
  let initialClass = 'tw-basis-full ';

  if (base) {
    initialClass = `${numberToFlexBasis(base)} `;
  }

  if (sm) {
    initialClass += `sm:${numberToFlexBasis(sm)} `;
  }

  if (md) {
    initialClass += `md:${numberToFlexBasis(md)} `;
  }

  if (lg) {
    initialClass += `lg:${numberToFlexBasis(lg)} `;
  }

  if (xl) {
    initialClass += `xl:${numberToFlexBasis(xl)} `;
  }

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${initialClass} ${className ?? ''}`}
    >
      {children}
    </div>
  );
};

export { Col };
