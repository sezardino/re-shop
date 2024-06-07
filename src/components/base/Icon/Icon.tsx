import { ForwardRefRenderFunction, SVGProps, forwardRef } from "react";

import * as fiIcons from "react-icons/fi";
import * as hiIcons from "react-icons/hi";
import * as tbIcons from "react-icons/tb";

export type FiIconNames = keyof typeof fiIcons;
export type HiIconNames = keyof typeof hiIcons;
export type TbIconNames = keyof typeof tbIcons;
export type IconNames = FiIconNames | HiIconNames | TbIconNames;

type Props = {
  name: IconNames;
  size?: number;
  className?: string;
};

export type IconProps = SVGProps<SVGSVGElement> & Props;

const IconComponent: ForwardRefRenderFunction<
  SVGSVGElement,
  Omit<IconProps, "ref">
> = (props, ref) => {
  const { rotate, name, size = 24, ...rest } = props;
  const Icon = {
    ...fiIcons,
    ...hiIcons,
    ...tbIcons,
  }[name];

  return (
    <Icon
      {...rest}
      // @ts-ignore
      ref={ref}
      size={size}
    />
  );
};

export const Icon = forwardRef(IconComponent);
