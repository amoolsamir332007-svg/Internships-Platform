import { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { USER_ROLES } from "../utils/constants";
 
export const RoleContext = createContext(null);
 
export const RoleProvider = ({ children }) => {
 
  const { user } = useContext(AuthContext);
 
  const role = user?.role || null;

  const isStudent = role === USER_ROLES.STUDENT;
  const isInstitution = role === USER_ROLES.INSTITUTION;
 
  const value = {
    role,
    isStudent,
    isInstitution,
  };
 
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};