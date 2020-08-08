import Home from "../pages/home/Home";
import React from "react";
import UseCaseControl from "../components/useCase/UseCaseControl";
import UseCaseView from "../components/useCase/UseCaseView";
import { useSelector } from "react-redux";
import UseCaseNoLogged from "../components/useCase/UseCaseNoLogged";

const RenderHomeUseCase = () => {
  const userLogged = useSelector(state => state.userUidReducer);

  return (
    <Home
      Left={userLogged ? UseCaseControl : UseCaseNoLogged}
      Right={UseCaseView}
    />
  );
};

export default RenderHomeUseCase;
