import React, { Component } from "react";

import "./App.scss";
import AppNavbar from "./components/appnavbar/AppNavbar.component";
import HomePage from "./components/homepage/HomePage.component";
import AboutPage from "./components/aboutpage/AboutPage.component";
import NewCommandType from "./components/commandtype/NewCommandType.component";
import Login from "./components/security/authentication/login/Login.component";
import UserList from "./components/security/admin/usersummary/UserList.component";
import ChangePassword from "./components/security/authentication/changepassword/ChangePassword.component";
import AlertBar from "./components/alert/AlertBar.component";
import PrivateRoute from "./components/security/authentication/privateroute/PrivateRoute.component";

import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar></AppNavbar>
          <Container>
            <AlertBar />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/update-password" component={ChangePassword} />
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute exact path="/commandtype/new" component={NewCommandType} />
              <PrivateRoute exact path="/user-management" component={UserList} />
            </Switch>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
