import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const emailUpdate = (email) => {
    return currentUser.updateEmail(email);
  };

  const passwordUpdate = (password) => {
    return currentUser.updatePassword(password);
  };

  const forgotPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unSub();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        signup,
        emailUpdate,
        passwordUpdate,
        forgotPassword,
        currentUser,
      }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, AuthContext };
