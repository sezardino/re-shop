import { Button, ButtonProps, Tooltip, TooltipProps } from "@nextui-org/react";
import {
  ComponentPropsWithRef,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";

type Props = {
  tooltipProps?: Omit<TooltipProps, "content">;
  content: string;
  disabledContent?: string;
};

export type ButtonWithTooltipProps = ComponentPropsWithRef<"span"> &
  ButtonProps &
  Props;

const ButtonWithTooltipComponent: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonWithTooltipProps
> = (props, ref) => {
  const {
    content,
    disabledContent,
    isDisabled,
    tooltipProps,
    children,
    className,
    ...rest
  } = props;

  const tooltipContent = isDisabled ? disabledContent : content;

  return (
    <Tooltip
      ref={ref}
      {...tooltipProps}
      content={tooltipContent}
      isDisabled={!tooltipContent}
    >
      <span className={className}>
        <Button {...rest} isDisabled={isDisabled}>
          {children}
        </Button>
      </span>
    </Tooltip>
  );
};

export const ButtonWithTooltip = forwardRef(ButtonWithTooltipComponent);
