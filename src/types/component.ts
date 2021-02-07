import { ReactChild, CSSProperties } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type isTure = 1 | 0 | undefined;

export interface ComponentItemDataProps {
  name: componentName; // 需要渲染的组件名字
  label: string; // 左侧组件列表中显示的名字
  key?: number | string;
  id?: string;
  isselected?: isTure;
  icon?: IconProp;
  children?: ReactChild; // 子元素
  propValue?: string; // 组件所使用的值
  animations?: string[]; // 动画列表
  events?: string[]; // 事件列表
  style?: CSSProperties; // 组件样式
  draggable?: boolean; // 是否可拖拽
}

export type ComponentDataProps = ComponentItemDataProps[];

export type componentName = "button" | "text";

export type ComponentActionType =
  | "addComponent"
  | "modifyComponentById"
  | "handleSelect";

export type ComponentDispatchProps = {
  type: ComponentActionType;
  data?: ComponentItemDataProps;
};
