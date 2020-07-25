import React, { useEffect } from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
// import { PrivateRoute, SignOutRoute } from "./utils/requireAuth";
import Home from "./pages/home/Home";
import TestCaseModal from "./components/testCase/TestCaseModal";
import LateralMenu from "./components/testCase/LateralMenu";
import { useSelector } from "react-redux";
import LateralMenuLogged from "./components/testCase/LateralMenuLogged";
import { useHistory } from "react-router";

function Routes() {
  const userLogged = useSelector(state => state.userUidReducer);
  return (
    <HashRouter>
      <Switch>
        <Home>
          <Route
            path={"/"}
            component={[
              userLogged ? LateralMenuLogged : LateralMenu,
              TestCaseModal
            ]}
          />
        </Home>
      </Switch>
    </HashRouter>
  );
}

export default Routes;
