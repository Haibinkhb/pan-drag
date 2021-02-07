import React from "react";
import ComponentDataContext, {
  useComponentDataReducer,
} from "./hooks/useComponentDataReducer";
import ToolBar from "./layout/ToolBar";
import DraggableComponentList from "./layout/DraggableComponentList";
import Attributes from "./layout/Attributes";
import Edit from "./layout/Edit";
import "./App.scss";
function App() {
  const { componentData, dispatch } = useComponentDataReducer();
  return (
    <ComponentDataContext.Provider value={{ componentData, dispatch }}>
      <div className="App">
        <header className="header">
          <ToolBar />
        </header>
        <main className="main">
          <DraggableComponentList className="left" />
          <Edit className="center" />
          <Attributes className="right" />
        </main>
      </div>
    </ComponentDataContext.Provider>
  );
}

export default App;
