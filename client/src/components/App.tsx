import React from "react";
import ChatRoom from "./ChatRoom";
import NoRoute from "./NoRoute";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

export default function App(_props: any) {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/chat" />
        </Route>
        <Route exact path="/chat">
          <ChatRoom />
        </Route>
        <Route>
          <NoRoute />
        </Route>
      </Switch>
    </Router>
  );
}
