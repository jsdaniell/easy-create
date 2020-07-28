import React, { useEffect } from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
// import { PrivateRoute, SignOutRoute } from "./utils/requireAuth";
import Home from "./pages/home/Home";
import TestCaseModal from "./components/testCase/TestCaseModal";
import LateralMenu from "./components/testCase/LateralMenu";
import { useSelector, useDispatch } from "react-redux";
import LateralMenuLogged from "./components/testCase/LateralMenuLogged";
import { useHistory } from "react-router";
import GeneratorControl from "./components/generator/GeneratorControl";
import GeneratorView from "./components/generator/GeneratorView";

const RenderHomeTests = () => {
  const userLogged = useSelector(state => state.userUidReducer);

  return (
    <Home
      Left={userLogged ? LateralMenuLogged : LateralMenu}
      Right={TestCaseModal}
    />
  );
};

const RenderHomeGenerator = () => {
  return <Home Left={GeneratorControl} Right={GeneratorView} />;
};

function Routes() {
  const testsGroups = useSelector(state => state.testGroupsReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (testsGroups) {
      dispatch({
        type: "SET_TEST_GROUPS_STATE",
        payload: {
          list: [],
          selected: null
        }
      });
    }
  }, []);
  return (
    <HashRouter>
      <Switch>
        <Route exact path={"/"} component={RenderHomeTests} />

        <Route exact path={"/generator"} component={RenderHomeGenerator} />
      </Switch>
    </HashRouter>
  );
}

export default Routes;
