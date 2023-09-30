import React, { useContext, useState, useEffect } from "react";

export const AuthContext = React.createContext({
  authToken: null,
  setToken: () => {},
  removeToken: () => {},
  userID: null,
  setUserRegID: () => {},
  removeUserRegID: () => {},
  isAuthenticated: () => false,
  role: null,
  setUserRole: () => {},
  loading: true,
});

export default function AuthProvider({ children }) {
  const [userID, setUserID] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedAuthToken = sessionStorage.getItem("token");
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    const storedUserRole = sessionStorage.getItem("role");
    if (storedUserRole) {
      setUserRole(storedUserRole);
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
  const setUserRole = (role) => {
    setRole(role);
    sessionStorage.setItem("role", role);
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
        role,
        setUserRole,
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
