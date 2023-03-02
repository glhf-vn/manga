import { useContext } from "react";

import { BsListUl, BsColumns } from "react-icons/bs";

import {
  ViewContext,
  ViewDispatchContext,
} from "@components/index/ViewProvider";

import Button from "@components/Button";

const ChangeView = () => {
  const view = useContext(ViewContext);
  const dispatch = useContext(ViewDispatchContext);

  return (
    <Button
      className="flex-1 text-2xl"
      onClick={() =>
        dispatch({
          type: "toggle",
        })
      }
      aria-label="Thay đổi layout"
      role="button"
      intent="secondary"
    >
      {view == 0 ? <BsListUl /> : <BsColumns />}
    </Button>
  );
};

export default ChangeView;
