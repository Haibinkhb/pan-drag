/* 左侧可拖拽组件列表 */
import React, { FC, useState } from "react";
import { Icon } from "../components";
import classnames from "classnames";
// import "./DraggableComponentList.scss";
import { ComponentDataProps, ComponentItemDataProps } from "../types/component";

interface DraggableComponentListProps {
  className?: string;
}

const baseButtonComponent: ComponentItemDataProps = {
  name: "button",
  label: "",
  children: "button",
  draggable: true,
  icon: "hand-point-up",
  style: {
    width: 100,
    height: 60,
    position: "absolute",
    top: 0,
    left: 0,
  },
};

const baseTextComponent: ComponentItemDataProps = {
  name: "text",
  label: "",
  children: "",
  draggable: true,
  icon: "font",

  style: {
    width: 100,
    height: 60,
    position: "absolute",
    top: 0,
    left: 0,
  },
};

export const componentList: ComponentDataProps = [
  baseButtonComponent,
  baseTextComponent,
];

const DraggableComponentList: FC<DraggableComponentListProps> = (props) => {
  const [componentList] = useState([baseButtonComponent, baseTextComponent]);
  const { className } = props;
  const listClass = classnames(className);
  const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
    const { index } = (event.target as HTMLButtonElement).dataset; // TODO : HTMLButtonElement 需要根据参数动态传入
    event.dataTransfer.setData("index", index!);
  };
  return (
    <div className={listClass}>
      <div className="title">组件库</div>
      <div className="component-list">
        {componentList.map((component, index) => {
          return (
            <div
              className="component-item"
              key={index}
              draggable
              data-index={index}
              onDragStart={handleDragStart}
            >
              <Icon className="icon" icon={component.icon!} />
              <span className="text">{component.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DraggableComponentList;
