/* 画布 */
import React, { FC, useContext, Dispatch, useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import classnames from "classnames";
import ComponentDataContext from "../hooks/useComponentDataReducer";
import "./Edit.scss";
import { ComponentDispatchProps } from "../types/component";
import { componentList } from "./DraggableComponentList";
import EditWrapper from "../components/Editor/editWrapper";

export interface EditProps {
  className?: string;
}

function handleDrop(
  event: React.DragEvent<HTMLElement>,
  dispatch: Dispatch<ComponentDispatchProps>
) {
  event.preventDefault();
  event.stopPropagation();
  const index = Number(event.dataTransfer.getData("index"));

  const { clientX, clientY } = event;
  const { offsetLeft, offsetTop } = event.target as HTMLButtonElement;
  /* TODO: component 数据需要深克隆 */
  const component = componentList[index];
  const left = clientX - offsetLeft;
  const top = clientY - offsetTop;
  const style = {
    ...component.style,
    left,
    top,
  };
  const id = uuidv4();
  const data = { ...component, id, key: id, draggable: false, style };
  dispatch({
    type: "addComponent",
    data,
  });
}

function handleDragOver(event: React.DragEvent<HTMLElement>) {
  event.preventDefault();
}

const Edit: FC<EditProps> = (props) => {
  const { className } = props;
  const editClass = classnames(className);
  const { componentData, dispatch } = useContext(ComponentDataContext)!;

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      const { target } = event;
      const { id } = target as EventTarget & Element;
      /* 判断当前点击的区域是否是空白区域，如果是取消选中元素 */
      if (id === "edit-content") {
        dispatch({
          type: "handleSelect",
        });
      }
    },
    [dispatch]
  );

  return (
    <div className={editClass}>
      <div
        id="edit-content"
        className="content"
        onDrop={(e) => handleDrop(e, dispatch)}
        onDragOver={handleDragOver}
        onClick={handleClick}
      >
        {componentData.map((component) => {
          return (
            <EditWrapper
              key={component.key}
              component={component}
              dispatch={dispatch}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Edit;
