import React, {
  FC,
  Dispatch,
  useCallback,
  useEffect,
  useState,
  CSSProperties,
} from "react";
import {
  ComponentItemDataProps,
  ComponentDispatchProps,
} from "../../types/component";
import Button from "../../components/Button";
import Text from "../../components/Text";
const components = {
  button: Button,
  text: Text,
};

export type pointTtype = "lt" | "t" | "rt" | "r" | "rb" | "b" | "lb" | "l";

export interface EditWrapperProps {
  component: ComponentItemDataProps;
  dispatch: Dispatch<ComponentDispatchProps>;
}

const EditWrapper: FC<EditWrapperProps> = (props) => {
  const { component, dispatch } = props;
  const [isMouseDown, setIsMouseDown] = useState(false);
  // const [isPointMouseDown, setisPointMouseDown] = useState(false);
  const [mouseStartPos, setMouseStartPos] = useState({ x: 0, y: 0 });
  const TargetComponent = components[component.name];
  const pointList: pointTtype[] = ["lt", "t", "rt", "r", "rb", "b", "lb", "l"];
  const handlePointMouseDown = useCallback(
    (event: React.MouseEvent, point: pointTtype) => {
      event.stopPropagation();
      event.preventDefault();
      const { style } = component;
      const height = Number(style!.height);
      const width = Number(style!.width);
      const top = Number(style!.top);
      const left = Number(style!.left);
      const startX = event.clientX;
      const startY = event.clientY;
      // 是否需要保存快照
      // let needSave: boolean = false;
      const handlePointMouseMove = (event: MouseEvent) => {
        event.stopPropagation();
        // needSave = true;
        const { clientX, clientY } = event;
        const disY = clientY - startY;
        const disX = clientX - startX;
        const hasT = /t/.test(point);
        const hasL = /l/.test(point);
        const newHeight = height + (hasT ? -disY : disY);
        const newWidth = width + (hasL ? -disX : disX);
        const style = component.style!;
        style.height = newHeight > 0 ? newHeight : 0;
        style.width = newWidth > 0 ? newWidth : 0;
        style.left = left + (hasL ? disX : 0);
        style.top = top + (hasT ? disY : 0);
        dispatch({
          type: "modifyComponentById",
          data: { ...component, style },
        });
      };

      const handlePointMouseUp = (event: MouseEvent) => {
        event.stopPropagation();
        document.removeEventListener("mousemove", handlePointMouseMove);
        document.removeEventListener("mouseup", handlePointMouseUp);
      };
      document.addEventListener("mousemove", handlePointMouseMove);
      document.addEventListener("mouseup", handlePointMouseUp);
    },
    [component, dispatch]
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      setIsMouseDown(true);
      /* 记录鼠标初始位置 */
      const { clientX, clientY } = event;
      setMouseStartPos({ x: clientX, y: clientY });
      /* 设置选中 */
      dispatch({
        type: "handleSelect",
        data: component,
      });
    },
    [component, dispatch]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      if (!isMouseDown) return;
      /* 根据鼠标初始位置计算出鼠标移动距离并更新对应元素属性 */
      const { clientX, clientY } = event;
      const { x, y } = mouseStartPos;
      const moveX = clientX - x; // 鼠标横向移动的距离
      const moveY = clientY - y; // 鼠标纵向移动的距离
      let { left, top } = component.style!;
      left = moveX + Number(left);
      top = moveY + Number(top);
      const style = { ...component.style, left, top };
      dispatch({
        type: "modifyComponentById",
        data: { ...component, style },
      });
    },
    [isMouseDown, mouseStartPos, dispatch] // 不能将 component 加入依赖，否则会不符合预期
  );
  const handleMouseUp = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    setIsMouseDown(false);
    /* 初始化鼠标位置 */
    setMouseStartPos({ x: 0, y: 0 });
  }, []);

  const getPointStyle = useCallback(
    (point: pointTtype) => {
      const { width, height } = component.style!;
      const postion: CSSProperties = {};
      switch (point) {
        case "lt":
          postion.left = 0;
          postion.top = 0;
          postion.cursor = "nw-resize";
          postion.transform = "translate(-50%, -50%)";
          break;
        case "t":
          postion.left = Number(width) / 2;
          postion.top = 0;
          postion.cursor = "n-resize";
          postion.transform = "translate(-50%, -50%)";
          break;
        case "rt":
          postion.right = 0;
          postion.top = 0;
          postion.cursor = "ne-resize";
          postion.transform = "translate(50%, -50%)";
          break;
        case "r":
          postion.right = 0;
          postion.top = Number(height) / 2;
          postion.cursor = "w-resize";
          postion.transform = "translate(50%, -50%)";
          break;
        case "rb":
          postion.right = 0;
          postion.bottom = 0;
          postion.cursor = "se-resize";
          postion.transform = "translate(50%, 50%)";
          break;
        case "b":
          postion.left = Number(width) / 2;
          postion.bottom = 0;
          postion.cursor = "n-resize";
          postion.transform = "translate(-50%, 50%)";
          break;
        case "lb":
          postion.left = 0;
          postion.bottom = 0;
          postion.cursor = "sw-resize";
          postion.transform = "translate(-50%, 50%)";
          break;
        case "l":
          postion.right = 0;
          postion.left = 0;
          postion.top = Number(height) / 2;
          postion.cursor = "w-resize";
          postion.transform = "translate(-50%, -50%)";
          break;
      }
      const pointStyle: CSSProperties = {
        ...postion,
        position: "absolute",
        width: "10px",
        height: "10px",
        border: "1px solid #fd7e14",
        borderRadius: "50%",
        backgroundColor: "#fff",
      };
      return pointStyle;
    },
    [component]
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const shapeStyle = {
    ...component.style,
    border: "1px solid #fd7e14",
  };

  const targetComponentProps = JSON.parse(JSON.stringify(component));
  const targetComponentStyle: CSSProperties = {};
  targetComponentProps.style = targetComponentStyle;
  return (
    <div style={shapeStyle} onMouseDown={handleMouseDown}>
      <TargetComponent {...targetComponentProps} />

      {component.isselected
        ? pointList.map((point, index) => {
            return (
              <div
                onMouseDown={(event) => handlePointMouseDown(event, point)}
                key={index}
                style={getPointStyle(point)}
              ></div>
            );
          })
        : null}
    </div>
  );
};

export default EditWrapper;
