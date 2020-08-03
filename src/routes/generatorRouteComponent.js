import Home from "../pages/home/Home";
import GeneratorControl from "../components/generator/GeneratorControl";
import GeneratorView from "../components/generator/GeneratorView";
import React from "react";

const RenderHomeGenerator = () => {
  return <Home Left={GeneratorControl} Right={GeneratorView} />;
};

export default RenderHomeGenerator;
