import React, { useEffect } from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RenderHomeTests from "./routes/testRouteComponent";
import RenderHomeGenerator from "./routes/generatorRouteComponent";
import RenderHomeEmojis from "./routes/emojisRouteComponent";
import RenderHomeUseCase from "./routes/useCaseRouteComponent";

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

        <Route exact path={"/create-use-case"} component={RenderHomeUseCase} />

        <Route exact path={"/"} component={RenderHomeGenerator} />
      </Switch>
    </HashRouter>
  );
}

export default Routes;
