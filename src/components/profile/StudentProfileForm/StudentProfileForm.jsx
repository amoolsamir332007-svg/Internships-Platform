import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentProfileSchema } from "../../../schemas/studentProfileSchema";
import "./StudentProfileForm.css";

const DEFAULT_VALUES = {
  name: "",
  level: "",
  phoneNumber: "",
  gpa: "",
  bio: "",
};

/**
 * Editable form for a student's profile.
 * Fields match the confirmed backend schema for PUT /api/Student/profile:
 * { name, level, phoneNumber, gpa, bio }
 *
 * NOTE: the project brief also asked for University, Major, and Skills
 * fields. Those aren't part of the backend's Student profile schema (the
 * only confirmed fields are the five above), so they're intentionally
 * left out here rather than invented — sending them would either be
 * ignored or rejected by the API. See the summary for what's needed on
 * the backend to support them.
 *
 * @param {object} [initialData] - existing profile fetched from the API
 * @param {(formData: object) => Promise<void>} onSave - called with the form values on submit
 */
const StudentProfileForm = ({ initialData, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(studentProfileSchema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (initialData) {
      reset({ ...DEFAULT_VALUES, ...initialData });
    }
  }, [initialData, reset]);

  const submit = async (formData) => {
    await onSave(formData);
  };

  return (
    <form className="student-profile-form" onSubmit={handleSubmit(submit)} noValidate>
      {/* Personal Information */}
      <div className="student-profile-form-section">
        <h3 className="student-profile-form-section-title">Personal Information</h3>

        <div className="student-profile-form-field">
          <label htmlFor="name">Full name</label>
          <input id="name" type="text" {...register("name")} />
          {errors.name && <span className="student-profile-form-error">{errors.name.message}</span>}
        </div>

        <div className="student-profile-form-field">
          <label htmlFor="phoneNumber">Phone number</label>
          <input id="phoneNumber" type="text" {...register("phoneNumber")} />
          {errors.phoneNumber && (
            <span className="student-profile-form-error">{errors.phoneNumber.message}</span>
          )}
        </div>
      </div>

      {/* Academic Information */}
      <div className="student-profile-form-section">
        <h3 className="student-profile-form-section-title">Academic Information</h3>

        <div className="student-profile-form-row">
          <div className="student-profile-form-field">
            <label htmlFor="level">Academic level</label>
            <input id="level" type="text" placeholder="e.g. Junior, 3rd year" {...register("level")} />
            {errors.level && <span className="student-profile-form-error">{errors.level.message}</span>}
          </div>

          <div className="student-profile-form-field">
            <label htmlFor="gpa">GPA</label>
            <input id="gpa" type="number" step="0.01" min="0" max="4" {...register("gpa")} />
            {errors.gpa && <span className="student-profile-form-error">{errors.gpa.message}</span>}
          </div>
        </div>
      </div>

      {/* About Me */}
      <div className="student-profile-form-section">
        <h3 className="student-profile-form-section-title">About Me</h3>

        <div className="student-profile-form-field">
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" rows={5} {...register("bio")} />
          {errors.bio && <span className="student-profile-form-error">{errors.bio.message}</span>}
        </div>
      </div>

      <button type="submit" className="student-profile-form-submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
};

export default StudentProfileForm;
