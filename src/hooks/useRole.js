 import { useContext } from "react";
import { RoleContext } from "../context/RoleContext";
 
export const useRole = () => {
  const context = useContext(RoleContext);
 
  if (!context) {
    throw new Error("use role should be used within RoleProvider");
  }
 
  return context;
};