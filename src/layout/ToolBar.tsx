/* 顶部工具栏 */
import React, { FC } from "react";

interface ToolBarProps {
  className?: string;
}

const ToolBar: FC<ToolBarProps> = (props) => {
  const { className } = props;
  return <div className={className}>工具栏</div>;
};

export default ToolBar;
