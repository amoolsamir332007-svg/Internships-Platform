import { useState, useCallback, useEffect } from "react";
import { getInstitutionProfile } from "../../api/profileService";
import InstitutionProfileForm from "../../components/profile/InstitutionProfileForm/InstitutionProfileForm";
import LoadingSpinner from "../../components/common/LoadingSpinner/LoadingSpinner";
import "./InstitutionProfile.css";

const InstitutionProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasProfile, setHasProfile] = useState(true);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getInstitutionProfile();
      setProfile(res.data);
      setHasProfile(true);
    } catch (err) {
      if (err.response?.status === 404) {
        setHasProfile(false);
        setProfile(null);
      } else {
        setError(
          err.response?.data?.title ||
          err.response?.data?.message ||
          "Something went wrong while loading your profile."
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

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

      {!loading && !error && !hasProfile && (
        <div className="institution-profile-page-empty">
          You haven't created your institution profile yet. Fill in the form
          below to get started.
        </div>
      )}

      {!loading && !error && (
        <InstitutionProfileForm initialData={profile} onSuccess={setProfile} />
      )}
    </div>
  );
};

export default InstitutionProfile;
