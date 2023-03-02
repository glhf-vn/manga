import {
  type Dispatch,
  type ReactNode,
  createContext,
  useReducer,
} from "react";

enum View {
  Grid,
  List,
}

interface ViewAction {
  type: "toggle" | "set";
  view?: View;
}

interface Props {
  children?: ReactNode;
}

export const ViewContext = createContext(View.Grid);
export const ViewDispatchContext = createContext<Dispatch<ViewAction>>(
  () => null
);

export function ViewProvider({ children }: Props) {
  const [view, dispatch] = useReducer(viewReducer, View.Grid);

  return (
    <ViewContext.Provider value={view}>
      <ViewDispatchContext.Provider value={dispatch}>
        {children}
      </ViewDispatchContext.Provider>
    </ViewContext.Provider>
  );
}

const viewReducer = (view: View, action: ViewAction) => {
  switch (action.type) {
    case "set":
      return action.view || view;
    case "toggle":
      return view == View.Grid ? View.List : View.Grid;
    default:
      throw Error("Unknown action: " + action.type);
  }
};
