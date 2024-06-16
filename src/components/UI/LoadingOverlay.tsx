import { ComponentPropsWithoutRef, type FC } from "react";
import { Icon } from "../base/Icon/Icon";

export interface LoadingOverlayProps extends ComponentPropsWithoutRef<"div"> {}

export const LoadingOverlay: FC<LoadingOverlayProps> = (props) => {
  return (
    <div
      {...props}
      className="absolute backdrop-blur-sm z-10 h-full w-full flex items-center justify-center"
    >
      <div className="flex items-center">
        <span className="sr-only">Loading</span>
        <Icon name="FiLoader" size={40} className="animate-spin" />
      </div>
    </div>
  );
};
