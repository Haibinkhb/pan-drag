import React, { FC, ReactNode, InputHTMLAttributes } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classnames from "classnames";
import Icon from "../Icon";

interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  preIcon?: IconProp;
  addonAfter?: ReactNode;
  addonBefore?: ReactNode;
}

export const Input: FC<InputProps> = (props) => {
  const { className, addonBefore, addonAfter, preIcon, ...restProps } = props;
  const classNames = classnames(className, "input-box");
  if (addonBefore || addonAfter || preIcon) {
    return (
      <span className={classNames}>
        {preIcon ? <Icon icon={preIcon} /> : null}
        {addonBefore ? addonBefore : null}
        <input type="text" {...restProps} />
        {addonAfter ? addonAfter : null}
      </span>
    );
  }
  return <input type="text" {...restProps} />;
};

export default Input;
