import { getLocalStorage, setLocalStorage } from "@lib/common";
import {
  type Dispatch,
  type ReactNode,
  createContext,
  useReducer,
  useEffect,
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
  const [view, dispatch] = useReducer(
    viewReducer,
    getLocalStorage("RELEASES_VIEW", View.Grid)
  );

  useEffect(() => {
    setLocalStorage("RELEASES_VIEW", view);
  }, [view]);

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
