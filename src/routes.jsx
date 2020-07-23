import React, { useEffect } from "react";
import { Switch, Route, HashRouter, useHistory } from "react-router-dom";
// import { PrivateRoute, SignOutRoute } from "./utils/requireAuth";
import { useDispatch } from "react-redux";
import Home from "./pages/home/Home";
import TestCaseModal from "./components/TestCaseModal";
import LateralMenu from "./components/LateralMenu";

function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Home>
          <Route path="/" component={[LateralMenu, TestCaseModal]} />
        </Home>
      </Switch>
    </HashRouter>
  );
}

export default Routes;
