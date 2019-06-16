import React from "react";
import { connect } from "react-redux";
import LoadingScreen from "../components/layout/Spinner";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Comp,
  isEmpty,
  isInitializing,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!isInitializing ? (
          <LoadingScreen />
        ) : !!isEmpty ? (
          <Redirect to={"/login"} />
        ) : (
          <Comp {...routeProps} />
        )
      }
    />
  );
};

export default connect(
  ({
    firebase: {
      auth: { isEmpty },
      isInitializing
    }
  }) => {
    return { isEmpty, isInitializing };
  }
)(PrivateRoute);
