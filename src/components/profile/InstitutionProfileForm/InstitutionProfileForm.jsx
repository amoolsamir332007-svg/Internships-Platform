import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { institutionProfileSchema } from "../../../schemas/institutionProfileSchema";
import { updateInstitutionProfile } from "../../../api/profileService";
import "./InstitutionProfileForm.css";
 
const DEFAULT_VALUES = {
  institutionName: "",
  description: "",
  website: "",
  phone: "",
  location: "",
  logo: "",
};
 
/**
 * Editable form for an institution's public profile.
 *
 * @param {object} [initialData] - existing profile fetched from the API
 * @param {(updatedProfile: object) => void} [onSuccess] - called after a successful save
 */
const InstitutionProfileForm = ({ initialData, onSuccess }) => {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(institutionProfileSchema),
    defaultValues: DEFAULT_VALUES,
  });
 
  useEffect(() => {
    if (initialData) {
      reset({ ...DEFAULT_VALUES, ...initialData });
    }
  }, [initialData, reset]);
 
  const onSubmit = async (formData) => {
    setServerError("");
    setSuccessMessage("");
 
    try {
      const response = await updateInstitutionProfile(formData);
      setSuccessMessage("Profile updated successfully");
      onSuccess?.(response.data);
    } catch (err) {
      setServerError(
        err.response?.data?.message ||
          "Something went wrong while updating the profile"
      );
    }
  };
 
  return (
    <form
      className="institution-profile-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {serverError && (
        <div className="institution-profile-form-alert institution-profile-form-alert-error">
          {serverError}
        </div>
      )}
      {successMessage && (
        <div className="institution-profile-form-alert institution-profile-form-alert-success">
          {successMessage}
        </div>
      )}
 
      <div className="institution-profile-form-field">
        <label htmlFor="institutionName">Institution name</label>
        <input
          id="institutionName"
          type="text"
          {...register("institutionName")}
        />
        {errors.institutionName && (
          <span className="institution-profile-form-error">
            {errors.institutionName.message}
          </span>
        )}
      </div>
 
      <div className="institution-profile-form-field">
        <label htmlFor="description">Description</label>
        <textarea id="description" rows={5} {...register("description")} />
        {errors.description && (
          <span className="institution-profile-form-error">
            {errors.description.message}
          </span>
        )}
      </div>
 
      <div className="institution-profile-form-row">
        <div className="institution-profile-form-field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" type="text" {...register("phone")} />
          {errors.phone && (
            <span className="institution-profile-form-error">
              {errors.phone.message}
            </span>
          )}
        </div>
 
        <div className="institution-profile-form-field">
          <label htmlFor="location">Location</label>
          <input id="location" type="text" {...register("location")} />
          {errors.location && (
            <span className="institution-profile-form-error">
              {errors.location.message}
            </span>
          )}
        </div>
      </div>
 
      <div className="institution-profile-form-row">
        <div className="institution-profile-form-field">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            placeholder="https://example.com"
            {...register("website")}
          />
          {errors.website && (
            <span className="institution-profile-form-error">
              {errors.website.message}
            </span>
          )}
        </div>
 
        <div className="institution-profile-form-field">
          <label htmlFor="logo">Logo URL</label>
          <input id="logo" type="text" {...register("logo")} />
          {errors.logo && (
            <span className="institution-profile-form-error">
              {errors.logo.message}
            </span>
          )}
        </div>
      </div>
 
      <button
        type="submit"
        className="institution-profile-form-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
};
 
export default InstitutionProfileForm;