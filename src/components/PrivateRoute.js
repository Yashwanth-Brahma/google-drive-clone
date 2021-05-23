import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useGlobalContext } from "../context/AuthProvider";

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser } = useGlobalContext();
  return (
    <Route
      {...rest}
      render={() => {
        return currentUser ? children : <Redirect to="/login"></Redirect>;
      }}></Route>
  );
};

export default PrivateRoute;
