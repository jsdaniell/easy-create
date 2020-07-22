import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated, logout } from "../service/auth";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/signin", state: { from: props.location } }}
        />
      )
    }
  />
);

export const SignOutRoute = ({ ...rest }) => (
  <Route
    {...rest}
    render={props => {
      logout();
      return (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      );
    }}
  />
);
