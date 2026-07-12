import { Outlet } from "react-router-dom";
import { useRole } from "../../../hooks/useRole";
import InstitutionSidebar from "../InstitutionSidebar/InstitutionSidebar";
import StudentSidebar from "../StudentSidebar/StudentSidebar";
import "./DashboardLayout.css";
 
const DashboardLayout = () => {
const { isInstitution, isStudent } = useRole();
 
  return (
    <div className="dashboard-layout">
      {isInstitution && <InstitutionSidebar />}
      {isStudent && <StudentSidebar />}
      <main className="dashboard-layout-content">
        <Outlet />
      </main>
    </div>
  );
};
 
export default DashboardLayout;