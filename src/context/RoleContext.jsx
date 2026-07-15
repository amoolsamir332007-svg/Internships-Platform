import { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { USER_ROLES } from "../utils/constants";
 
export const RoleContext = createContext(null);
 
export const RoleProvider = ({ children }) => {
 
  const { user } = useContext(AuthContext);
 
  const role = user?.role || null;
 
  // كنا نقارن بـ "student" / "institution" بحرف صغير، بس role القادم
  // من user.role هو "Student" / "Institution" (نفس USER_ROLES بالباك اند)،
  // فالمقارنة كانت دايماً false. صلّحناها نستخدم نفس الثوابت بكل مكان.
  const isStudent = role === USER_ROLES.STUDENT;
  const isInstitution = role === USER_ROLES.INSTITUTION;
 
  const value = {
    role,
    isStudent,
    isInstitution,
  };
 
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};