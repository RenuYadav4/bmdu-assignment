import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userInfo");
    const token = localStorage.getItem("authToken");
    return storedUser && token ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    if (user && token) {
      localStorage.setItem("userInfo", JSON.stringify(user));
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("authToken");
    }
  }, [user, token]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    setUser(null);
    setToken(null);
    window.location.href = "/login"; // redirect to login
  };

  useEffect(() => {
    const handleTokenExpired = () => {
      console.log("Token expired — logging out user");
      logoutUser();
    };
    window.addEventListener("tokenExpired", handleTokenExpired);
    return () =>
      window.removeEventListener("tokenExpired", handleTokenExpired);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        logoutUser,
        loading,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
