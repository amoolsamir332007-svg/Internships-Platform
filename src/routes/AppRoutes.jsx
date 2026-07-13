import { Routes, Route, Outlet } from "react-router-dom";
 
import Navbar from "../components/common/Navbar/Navbar";
import Footer from "../components/common/Footer/Footer";
import DashboardLayout from "../components/dashboard/DashboardLayout/DashboardLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";
 
import Home from "../pages/HomePage/Home";
import GetStarted from "../pages/GetStartedPage/GetStarted";
import Login from "../pages/LoginPage/Login";
import Signup from "../pages/SignupPage/Signup";
import Contact from "../pages/ContactPage/Contact";
import InternshipDetail from "../pages/InternshipDetailPage/InternshipDetail";
import InstitutionProfile from "../pages/InstitutionProfilePage/InstitutionProfile";
import NotFound from "../pages/NotFoundPage/NotFound";
 
import InstitutionDashboard from "../pages/dashboardPage/InstitutionDash/InstitutionDashboard";
import PostInternship from "../pages/dashboardPage/InstitutionDash/PostInternship";
import ManageInternships from "../pages/dashboardPage/InstitutionDash/ManageInternships";
import InstitutionApplicants from "../pages/dashboardPage/InstitutionDash/InstitutionApplicants";
 
import StudentDashboard from "../pages/dashboardPage/StudentDash/StudentDashboard";
import StudentProfile from "../pages/StudentProfilePage/StudentProfile";
 
import { USER_ROLES, ROUTES } from "../utils/constants";

const PublicLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* ---------- Public routes ---------- */}
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.GET_STARTED} element={<GetStarted />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route
          path={ROUTES.INTERNSHIP_DETAIL()}
          element={<InternshipDetail />}
        />
        <Route
          path={ROUTES.INSTITUTION_PROFILE_VIEW()}
          element={<InstitutionProfile />}
        />
        {/* ---------- Fallback (kept inside PublicLayout so it still gets the Navbar/Footer) ---------- */}
        <Route path="*" element={<NotFound />} />
      </Route>
 
      {/*
        ---------- Institution-only routes ----------
        ProtectedRoute here expects `children` (not <Outlet/>) and a single
        `allowedRole` string — matches the real ProtectedRoute.jsx signature.
        DashboardLayout is passed in as those children, and DashboardLayout's
        own <Outlet/> is what renders each nested child route below.
      */}
      <Route
        element={
          <ProtectedRoute allowedRole={USER_ROLES.INSTITUTION}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path={ROUTES.INSTITUTION_DASHBOARD}
          element={<InstitutionDashboard />}
        />
        <Route
          path={ROUTES.INSTITUTION_POST_INTERNSHIP}
          element={<PostInternship />}
        />
        <Route
          path={ROUTES.INSTITUTION_MANAGE_INTERNSHIPS}
          element={<ManageInternships />}
        />
        <Route
          path={ROUTES.INSTITUTION_APPLICANTS}
          element={<InstitutionApplicants />}
        />
        {/*
          NOTE: institution's own "edit profile" page and the public
          "view institution" page currently point at the SAME component
          (InstitutionProfile.jsx, which calls getMyProfile()). That's
          fine for editing your own profile, but it won't yet show a
          different institution's profile when visited via /institution/:id.
          Flag this to your teammate if the public view needs to support
          viewing OTHER institutions by id.
        */}
        <Route
          path={ROUTES.INSTITUTION_PROFILE}
          element={<InstitutionProfile />}
        />
      </Route>
 
      {/* ---------- Student-only routes ---------- */}
      <Route
        element={
          <ProtectedRoute allowedRole={USER_ROLES.STUDENT}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path={ROUTES.STUDENT_DASHBOARD}
          element={<StudentDashboard />}
        />
        <Route path={ROUTES.STUDENT_PROFILE} element={<StudentProfile />} />
      </Route>
     </Routes>
  );
};
 
export default AppRoutes;