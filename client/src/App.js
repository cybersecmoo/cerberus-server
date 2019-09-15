import React, { Component } from "react";
import "./App.css";
import AppNavbar from "./components/appnavbar/AppNavbar.component";
import HomePage from "./components/homepage/HomePage.component";
import AboutPage from "./components/aboutpage/AboutPage.component";
import NewCommandType from "./components/commandtype/NewCommandType.component";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar></AppNavbar>
        <div className="container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/commandtype/new" component={NewCommandType} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
