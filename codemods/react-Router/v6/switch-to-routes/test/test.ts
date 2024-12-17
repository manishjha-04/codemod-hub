import { Route ,Switch} from "express";
import React from "react";

function AppRoutes() {


  return (
    <Switch>
      <Route exact path="/"  />
      <Route path="/about"/>
      <Route path="/dashboard" />
    </Switch>

  );
}
