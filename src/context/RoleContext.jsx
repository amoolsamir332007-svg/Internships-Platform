import { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";
 
export const RoleContext = createContext(null);
 
export const RoleProvider = ({ children }) => {

  const { user } = useContext(AuthContext);

  const role = user?.role || null;

  const isStudent = role === "student";
  const isInstitution = role === "institution";
 
  const value = {
    role,
    isStudent,
    isInstitution,
  };
 
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};