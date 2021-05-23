import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import {
  ForgotPassword,
  Home,
  Login,
  Profile,
  Signup,
  UpdateProfile,
} from "./pages";
import { AuthProvider } from "./context/AuthProvider";

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            {/* private Route */}
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute path="/updateProfile">
              <UpdateProfile />
            </PrivateRoute>

            {/* route */}
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/forgotpassword">
              <ForgotPassword />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
