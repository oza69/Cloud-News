import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Auth } from "aws-amplify";

import Login from "./pages/login";
import Register from "./pages/registration";
import Homepage from "./pages/homepage";
import SearchDetail from "./pages/searchdetail";
import NewsDetail from "./pages/newsdetail";
import SearchHistory from "./pages/searchhistory";
import Following from "./pages/following";
import Welcome from "./pages/welcome";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setSession();
  }, []);

  const setSession = async () => {
    try {
      const session = await Auth.currentSession();
      setIsAuthenticated(true);
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    } catch (error) {
      if (error !== "No current user") {
        console.log(error);
      }
    }
    setIsAuthenticating(false);
  };

  return (
    <BrowserRouter>
      {!isAuthenticating && (
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              component={(props) => (
                <Login
                  {...props}
                  isAuthenticated={isAuthenticated}
                  user={user}
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
              )}
            />
            <Route
              exact
              path="/login"
              component={(props) => (
                <Login
                  {...props}
                  isAuthenticated={isAuthenticated}
                  user={user}
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
              )}
            />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/homepage"
              component={(props) => (
                <Homepage
                  {...props}
                  isAuthenticated={isAuthenticated}
                  user={user}
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
              )}
            />
            <Route
              exact
              path="/searchdetail"
              component={(props) => (
                <SearchDetail
                  {...props}
                  isAuthenticated={isAuthenticated}
                  user={user}
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
              )}
            />
            <Route
              exact
              path="/newsdetail"
              component={(props) => (
                <NewsDetail
                  {...props}
                  isAuthenticated={isAuthenticated}
                  user={user}
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
              )}
            />
            <Route
              exact
              path="/searchhistory"
              component={(props) => (
                <SearchHistory
                  {...props}
                  isAuthenticated={isAuthenticated}
                  user={user}
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
              )}
            />
            <Route
              exact
              path="/following"
              component={(props) => (
                <Following
                  {...props}
                  isAuthenticated={isAuthenticated}
                  user={user}
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
              )}
            />
            <Route exact path="/welcome" component={Welcome} />
          </Switch>
        </div>
      )}
      )
    </BrowserRouter>
  );
}

export default App;
