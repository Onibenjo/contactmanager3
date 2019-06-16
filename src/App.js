import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import store, { rrfProps } from "./store";
import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";
import AddClient from "./components/client/AddClient";
import ClientDetails from "./components/client/ClientDetails";
import EditClient from "./components/client/EditClient";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Settings from "./components/settings/Settings";
import PublicRoute from "./helpers/PublicRoute";
import PrivateRoute from "./helpers/PrivateRoute";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router>
            <div className="App">
              <AppNavbar />
              <Switch>
                <PublicRoute restricted exact path="/login" component={Login} />
                <PublicRoute
                  restricted
                  exact
                  path="/register"
                  component={Register}
                />
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute exact path="/settings" component={Settings} />
                <PrivateRoute exact path="/client/add" component={AddClient} />
                <PrivateRoute
                  exact
                  path="/client/edit/:id"
                  component={EditClient}
                />
                <PrivateRoute
                  exact
                  path="/client/:id"
                  component={ClientDetails}
                />
              </Switch>
            </div>
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}

export default App;
