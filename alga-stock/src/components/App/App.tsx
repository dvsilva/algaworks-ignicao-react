import React from "react";
import "./App.css";

import HomeView from "../../views/HomeView";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomeView} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
