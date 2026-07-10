import { useFetch } from "../../hooks/useFetch";
import { getMyProfile } from "../api/profileService";
import InstitutionProfileForm from "../components/profile/InstitutionProfileForm";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import "./InstitutionProfilePage.css";
 
const InstitutionProfile = () => {
  const {
    data: profile,
    loading,
    error,
  } = useFetch(() => getMyProfile(), []);
 
  return (
    <div className="institution-profile-page">
      <div className="institution-profile-page-header">
        <h1>Institution profile</h1>
        <p>
          Keep your institution's information up to date so students know who
          they're applying to.
        </p>
      </div>
 
      {loading && <LoadingSpinner />}
      {error && <div className="institution-profile-page-error">{error}</div>}
      {!loading && !error && (
        <InstitutionProfileForm initialData={profile} />
      )}
    </div>
  );
};
 
export default InstitutionProfile;