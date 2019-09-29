import React, { Component } from "react";
import "./App.scss";
import AppNavbar from "./components/appnavbar/AppNavbar.component";
import HomePage from "./components/homepage/HomePage.component";
import AboutPage from "./components/aboutpage/AboutPage.component";
import NewCommandType from "./components/commandtype/NewCommandType.component";
import Login from "./components/security/authentication/login/Login.component";
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
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/commandtype/new" component={NewCommandType} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
