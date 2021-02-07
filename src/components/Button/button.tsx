import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classnames from "classnames";

export type ButtonSize = "lg" | "sm";
export type ButtonType = "primary" | "default" | "link" | "danger";

interface BaseButtonProps {
  size?: ButtonSize;
  btnType?: ButtonType;
  disabled?: boolean;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    size,
    btnType,
    disabled,
    href,
    ...restProps
  } = props;
  const btnclass = classnames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });
  if (btnType === "link") {
    return (
      <a {...restProps} href={href} className={btnclass}>
        {children}
      </a>
    );
  }
  return (
    <button {...restProps} disabled={disabled} className={btnclass}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  btnType: "default",
  disabled: false,
};
export default Button;
