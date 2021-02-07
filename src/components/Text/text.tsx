import React, { FC } from "react";

interface TextProps {}

const Text: FC<TextProps> = (props) => {
  const { children, ...restProps } = props;
  return <div {...restProps}>{children}</div>;
};

export default Text;
