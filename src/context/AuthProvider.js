import React, { useContext, useState, useEffect } from "react";

export const AuthContext = React.createContext({
  authToken: null,
  setToken: () => {},
  removeToken: () => {},
  userID: null,
  setUserRegID: () => {},
  removeUserRegID: () => {},
  isAuthenticated: () => false,
  loading: true,
});

export default function AuthProvider({ children }) {
  const [userID, setUserID] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuthToken = sessionStorage.getItem("token");
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
    }
    setLoading(false);
  }, []);

  const setToken = (token) => {
    setAuthToken(token);
    sessionStorage.setItem("token", token);
  };

  const removeToken = () => {
    setAuthToken(null);
    sessionStorage.removeItem("token");
  };

  const setUserRegID = (userID) => {
    setUserID(userID);
    sessionStorage.setItem("userId", userID);
  };

  const removeUserRegID = (userID) => {
    setUserID(userID);
    sessionStorage.removeItem("userId");
  };

  const isAuthenticated = () => {
    return authToken !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setToken,
        removeToken,
        userID,
        setUserRegID,
        removeUserRegID,
        isAuthenticated,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
