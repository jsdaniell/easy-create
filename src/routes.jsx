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
import EmojisControl from "./components/emojis/EmojisControl";
import EmojisView from "./components/emojis/EmojisView";

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

const RenderHomeEmojis = () => {
  return <Home Left={EmojisControl} Right={EmojisView} />;
};

function Routes() {
  const testsGroups = useSelector(state => state.testGroupsReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (testsGroups.list.length) {
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
        <Route exact path={"/emojis"} component={RenderHomeEmojis} />

        <Route exact path={"/create-test-case"} component={RenderHomeTests} />

        <Route exact path={"/"} component={RenderHomeGenerator} />
      </Switch>
    </HashRouter>
  );
}

export default Routes;
