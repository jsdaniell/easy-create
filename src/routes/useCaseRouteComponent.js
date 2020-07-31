import Home from "../pages/home/Home";
import React from "react";
import UseCaseControl from "../components/useCase/UseCaseControl";
import UseCaseView from "../components/useCase/UseCaseView";

const RenderHomeUseCase = () => {
  return <Home Left={UseCaseControl} Right={UseCaseView} />;
};

export default RenderHomeUseCase;
