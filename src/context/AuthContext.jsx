import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser, getCurrentUser } from "../api/authService";
 
export const AuthContext = createContext(null);
 
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
 
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const token = localStorage.getItem("token");
 
      if (!token) {
        setLoading(false);
        return;
      }
 
      try {
        const response = await getCurrentUser(); 
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
 
    checkLoggedInUser();
  }, []);

  const login = async (credentials) => {
  const response = await loginUser(credentials);
  const { token, email } = response.data;

  localStorage.setItem("token", token);

  const userData = {
    email,
  };

  setUser(userData);

  return userData;
};
 
  
  // const login = async (credentials) => {
  //   const response = await loginUser(credentials); // POST /auth/login
  //   const { token, user: userData } = response.data;
 
  //   localStorage.setItem("token", token);
  //   setUser(userData);
 
  //   return userData; 
  // };
 
  // const signup = async (formData) => {
  //   const response = await registerUser(formData); // POST /auth/register
  //   const { token, user: userData } = response.data;
 
  //   localStorage.setItem("token", token);
  //   setUser(userData);
 
  //   return userData;
  // };
 
  const signup = async (formData) => {
  const response = await registerUser(formData);

  return response.data;
};
  
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
 
  
  const value = {
    user,
    loading,
    isAuthenticated: !!user, 
    login,
    signup,
    logout,
  };
 
  return (
  <AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>
    );
  
};