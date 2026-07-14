import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser, getCurrentUser } from "../api/authService";
 
export const AuthContext = createContext(null);
 
export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null)
// first render
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if(storedUser){
      setUser(JSON.parse(storedUser))
    }
  },[])
  const login = (data, token) => {
    localStorage.setItem('user',JSON.stringify(data))
    localStorage.setItem('token', token)
    setUser(data)

  }
 
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
  }
  const isAuthenticated = !!user
  return (
  <AuthContext.Provider value={{user, login, logout, isAuthenticated}} >
    {children}
  </AuthContext.Provider>
  )
};