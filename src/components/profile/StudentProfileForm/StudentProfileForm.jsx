import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentProfileSchema } from "../../../schemas/studentProfileSchema";
import "./StudentProfileForm.css";

const DEFAULT_VALUES = {
  name: "",
  email: "",
  phoneNumber: "",
  location: "",
  level: "",
  university: "",
  major: "",
  gpa: "",
  bio: "",
  linkedinUrl: "",
  githubUrl: "",
  portfolioUrl: "",
  skills: [{ value: "" }],
};

const toFormSkills = (skills) => {
  if (!skills || skills.length === 0) return [{ value: "" }];
  if (typeof skills[0] === "string") {
    return skills.map((s) => ({ value: s }));
  }
  return skills;
};

const StudentProfileForm = ({ initialData, onSave }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(studentProfileSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...DEFAULT_VALUES,
        ...initialData,
        skills: toFormSkills(initialData.skills),
      });
    }
  }, [initialData, reset]);

  const submit = async (formData) => {
    const payload = {
      ...formData,
      skills: formData.skills.map((s) => s.value.trim()).filter(Boolean),
    };
    await onSave(payload);
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

        <div className="student-profile-form-row">
          <div className="student-profile-form-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" {...register("email")} />
            {errors.email && <span className="student-profile-form-error">{errors.email.message}</span>}
          </div>

          <div className="student-profile-form-field">
            <label htmlFor="phoneNumber">Phone number</label>
            <input id="phoneNumber" type="text" {...register("phoneNumber")} />
            {errors.phoneNumber && (
              <span className="student-profile-form-error">{errors.phoneNumber.message}</span>
            )}
          </div>
        </div>

        <div className="student-profile-form-field">
          <label htmlFor="location">Location</label>
          <input id="location" type="text" placeholder="e.g. Nablus, Palestine" {...register("location")} />
          {errors.location && (
            <span className="student-profile-form-error">{errors.location.message}</span>
          )}
        </div>
      </div>

      {/* Academic Information */}
      <div className="student-profile-form-section">
        <h3 className="student-profile-form-section-title">Academic Information</h3>

        <div className="student-profile-form-row">
          <div className="student-profile-form-field">
            <label htmlFor="university">University</label>
            <input id="university" type="text" {...register("university")} />
            {errors.university && (
              <span className="student-profile-form-error">{errors.university.message}</span>
            )}
          </div>

          <div className="student-profile-form-field">
            <label htmlFor="major">Major</label>
            <input id="major" type="text" {...register("major")} />
            {errors.major && <span className="student-profile-form-error">{errors.major.message}</span>}
          </div>
        </div>

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

      {/* Links & Portfolio */}
      <div className="student-profile-form-section">
        <h3 className="student-profile-form-section-title">Links & Portfolio</h3>

        <div className="student-profile-form-row">
          <div className="student-profile-form-field">
            <label htmlFor="linkedinUrl">LinkedIn</label>
            <input
              id="linkedinUrl"
              type="url"
              placeholder="https://linkedin.com/in/..."
              {...register("linkedinUrl")}
            />
            {errors.linkedinUrl && (
              <span className="student-profile-form-error">{errors.linkedinUrl.message}</span>
            )}
          </div>

          <div className="student-profile-form-field">
            <label htmlFor="githubUrl">GitHub</label>
            <input
              id="githubUrl"
              type="url"
              placeholder="https://github.com/..."
              {...register("githubUrl")}
            />
            {errors.githubUrl && (
              <span className="student-profile-form-error">{errors.githubUrl.message}</span>
            )}
          </div>
        </div>

        <div className="student-profile-form-field">
          <label htmlFor="portfolioUrl">Portfolio website</label>
          <input
            id="portfolioUrl"
            type="url"
            placeholder="https://your-portfolio.com"
            {...register("portfolioUrl")}
          />
          {errors.portfolioUrl && (
            <span className="student-profile-form-error">{errors.portfolioUrl.message}</span>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className="student-profile-form-section">
        <h3 className="student-profile-form-section-title">Skills</h3>

        {fields.map((field, index) => (
          <div className="student-profile-form-row" key={field.id}>
            <div className="student-profile-form-field">
              <input
                type="text"
                placeholder="e.g. React.js"
                {...register(`skills.${index}.value`)}
              />
              {errors.skills?.[index]?.value && (
                <span className="student-profile-form-error">
                  {errors.skills[index].value.message}
                </span>
              )}
            </div>
            <button
              type="button"
              className="student-profile-form-skill-remove"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
              aria-label="Remove skill"
            >
              ✕
            </button>
          </div>
        ))}
        {errors.skills?.message && (
          <span className="student-profile-form-error">{errors.skills.message}</span>
        )}

        <button
          type="button"
          className="student-profile-form-skill-add"
          onClick={() => append({ value: "" })}
        >
          + Add skill
        </button>
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