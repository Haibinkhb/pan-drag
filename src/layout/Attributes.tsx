/* 属性区域 */
import React, { FC } from "react";
import classnames from "classnames";
import "./Attributes.scss";
interface AttributesProps {
  className?: string;
}

const Attributes: FC<AttributesProps> = (props) => {
  const { className } = props;
  const attributesClass = classnames(className);
  return <div className={attributesClass}>属性区域</div>;
};

export default Attributes;
