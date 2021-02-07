import { useReducer, Reducer, createContext, Dispatch } from "react";
import { ComponentDataProps, ComponentDispatchProps } from "../types/component";

function modifyComponentById(
  state: ComponentDataProps,
  action: ComponentDispatchProps
) {
  // if (!action.data) return state;
  const { id } = action.data!;
  let returnValue = JSON.parse(JSON.stringify(state));
  returnValue = state.map((item) => (item.id === id ? action.data : item));
  return returnValue;
}
function handleSelect(
  state: ComponentDataProps,
  action: ComponentDispatchProps
) {
  const { data } = action;
  let returnValue: ComponentDataProps = JSON.parse(JSON.stringify(state));
  if (data) {
    const { id } = data;
    returnValue.forEach((item) => {
      if (item.id === id) {
        item.isselected = 1;
      } else {
        item.isselected = 0;
      }
    });
  } else {
    returnValue.forEach((item) => {
      item.isselected = 0;
    });
  }

  return returnValue;
}
function handleComponentData(
  state: ComponentDataProps,
  action: ComponentDispatchProps
): ComponentDataProps {
  switch (action.type) {
    case "addComponent":
      return [...state, action.data!];
    case "modifyComponentById":
      return modifyComponentById(state, action);
    case "handleSelect":
      return handleSelect(state, action);
    default:
      throw new Error("action 没有接收到 type 或 type 值不正确");
  }
}

export function useComponentDataReducer(initState: ComponentDataProps = []) {
  const [componentData, dispatch] = useReducer<
    Reducer<ComponentDataProps, ComponentDispatchProps>
  >(handleComponentData, initState);
  return { componentData, dispatch };
}

type ComponentDataContextType = {
  componentData: ComponentDataProps;
  dispatch: Dispatch<ComponentDispatchProps>;
};

const ComponentDataContext = createContext<
  ComponentDataContextType | undefined
>(undefined);

export default ComponentDataContext;
