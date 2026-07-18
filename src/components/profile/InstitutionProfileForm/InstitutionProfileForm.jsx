import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { institutionProfileSchema } from "../../../schemas/institutionProfileSchema";
import { updateInstitutionProfile } from "../../../api/profileService";
import "./InstitutionProfileForm.css";

const DEFAULT_VALUES = {
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
};

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
        err.response?.data?.title ||
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

      {/* Basic Information */}
      <div className="institution-profile-form-section">
        <h3 className="institution-profile-form-section-title">Basic Information</h3>
        <div className="institution-profile-form-field">
          <label htmlFor="name">Institution name</label>
          <input id="name" type="text" {...register("name")} />
          {errors.name && (
            <span className="institution-profile-form-error">{errors.name.message}</span>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="institution-profile-form-section">
        <h3 className="institution-profile-form-section-title">Contact Information</h3>
        <div className="institution-profile-form-row">
          <div className="institution-profile-form-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" {...register("email")} />
            {errors.email && (
              <span className="institution-profile-form-error">{errors.email.message}</span>
            )}
          </div>

          <div className="institution-profile-form-field">
            <label htmlFor="phoneNumber">Phone</label>
            <input id="phoneNumber" type="text" {...register("phoneNumber")} />
            {errors.phoneNumber && (
              <span className="institution-profile-form-error">{errors.phoneNumber.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="institution-profile-form-section">
        <h3 className="institution-profile-form-section-title">Location</h3>
        <div className="institution-profile-form-field">
          <label htmlFor="address">Address</label>
          <input id="address" type="text" {...register("address")} />
          {errors.address && (
            <span className="institution-profile-form-error">{errors.address.message}</span>
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
