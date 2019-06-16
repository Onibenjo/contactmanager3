import React from "react";
import { connect } from "react-redux";
import LoadingScreen from "../components/layout/Spinner";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Comp, isEmpty, isInitializing, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps =>
        rest.restricted ? (
          isInitializing ? (
            <LoadingScreen />
          ) : !isEmpty ? (
            <Redirect to={"/"} />
          ) : (
            <Comp {...routeProps} />
          )
        ) : (
          <Comp {...routeProps} />
        )
      }
    />
  );
};

// const locationHelper = locationHelperBuilder({});

// export const UserIsAuthenticated = connectedRouterRedirect({
//   wrapperDisplayName: "UserIsAuthenticated",
//   AuthenticatingComponent: LoadingScreen,
//   allowRedirectBack: true,
//   redirectPath: (state, ownProps) =>
//     locationHelper.getRedirectQueryParam(ownProps) || "/login",
//   authenticatingSelector: ({ firebase: { auth, profile, isInitializing } }) =>
//     !auth.isLoaded || isInitializing === true,
//   authenticatedSelector: ({ firebase: { auth } }) =>
//     auth.isLoaded && !auth.isEmpty
// });

// export const UserIsNotAuthenticated = connectedRouterRedirect({
//   wrapperDisplayName: "UserIsNotAuthenticated",
//   AuthenticatingComponent: LoadingScreen,
//   allowRedirectBack: false,
//   redirectPath: (state, ownProps) =>
//     locationHelper.getRedirectQueryParam(ownProps) || "/",
//   authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
//     !auth.isLoaded || isInitializing === true,
//   authenticatedSelector: ({ firebase: { auth } }) =>
//     auth.isLoaded && auth.isEmpty
// });

export default connect(({ firebase: { auth, isInitializing } }) => {
  return { isEmpty: auth.isEmpty, isInitializing };
})(PublicRoute);
