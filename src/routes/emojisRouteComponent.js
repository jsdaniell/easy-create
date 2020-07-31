import Home from "../pages/home/Home";
import EmojisControl from "../components/emojis/EmojisControl";
import EmojisView from "../components/emojis/EmojisView";
import React from "react";

const RenderHomeEmojis = () => {
  return <Home Left={EmojisControl} Right={EmojisView} />;
};

export default RenderHomeEmojis;
