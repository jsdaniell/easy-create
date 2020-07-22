import React, { useEffect } from "react";
import { Switch, Route, HashRouter, useHistory } from "react-router-dom";
// import { PrivateRoute, SignOutRoute } from "./utils/requireAuth";
import { useDispatch } from "react-redux";
import Home from "./pages/home/Home";

function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={Home} />
        {/*<MenuDrawer>*/}
        {/*<SignOutRoute exact path="/logout" />*/}
        {/*<PrivateRoute exact path="/" component={<div>2</div>} />*/}
        {/*  <PrivateRoute*/}
        {/*    exact*/}
        {/*    path="/active-users"*/}
        {/*    component={ActiveUsersPage}*/}
        {/*  />*/}
        {/*  <PrivateRoute*/}
        {/*    exact*/}
        {/*    path="/inactive-users"*/}
        {/*    component={InactiveUsersPage}*/}
        {/*  />*/}
        {/*  <PrivateRoute exact path="/prospects" component={ProspectsPage} />*/}
        {/*  <PrivateRoute*/}
        {/*    exact*/}
        {/*    path="/user-details"*/}
        {/*    component={UserDetailsPage}*/}
        {/*  />*/}
        {/*</MenuDrawer>*/}
      </Switch>
    </HashRouter>
  );
}

export default Routes;
