import React from "react";
import Job from "../pages/Job";
import { Switch, Route } from "react-router-dom";
import JobDetail from "../pages/JobDetail";
import Login from "../pages/Login";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/job" component={Job} />
      <Route exact path="/detail" component={JobDetail} />
    </Switch>
  );
};

export default Routes;
