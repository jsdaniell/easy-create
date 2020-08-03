import { useSelector } from "react-redux";
import Home from "../pages/home/Home";
import LateralMenuLogged from "../components/testCase/LateralMenuLogged";
import LateralMenu from "../components/testCase/LateralMenu";
import TestCaseModal from "../components/testCase/TestCaseModal";
import React from "react";

const RenderHomeTests = () => {
  const userLogged = useSelector(state => state.userUidReducer);

  return (
    <Home
      Left={userLogged ? LateralMenuLogged : LateralMenu}
      Right={TestCaseModal}
    />
  );
};

export default RenderHomeTests;
