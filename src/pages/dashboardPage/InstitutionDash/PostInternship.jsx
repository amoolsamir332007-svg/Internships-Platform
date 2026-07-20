import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { internshipSchema } from "../../../schemas/internshipSchema";
import { createInternship } from "../../../api/internshipService";
import "./InstitutionDash.css";

const DESCRIPTION_MAX_LENGTH = 500;

const PostInternship = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(internshipSchema),
    defaultValues: {
      description: "",
    },
  });

  const descriptionValue = watch("description") || "";

  const onCreate = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      };
      await createInternship(payload);
      navigate("/dashboard/institution/manage-internships");
    } catch (err) {
      console.log("createInternship error:", err.response?.status, err.response?.data);
      setSubmitError(
        err.response?.data?.title ||
        err.response?.data?.message ||
        "An error occurred while saving the internship"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-internship">
      <h1 className="post-internship-title">Add New Internship</h1>

      {submitError && <p className="post-internship-error">{submitError}</p>}

      <form className="post-internship-form">
        <div className="post-internship-field">
          <label htmlFor="title">Title</label>
          <input id="title" type="text" {...register("title")} />
          {errors.title && <span className="post-internship-error-text">{errors.title.message}</span>}
        </div>

        <div className="post-internship-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="5"
            maxLength={DESCRIPTION_MAX_LENGTH}
            {...register("description")}
          />
          <div className="post-internship-field-footer">
            {errors.description && (
              <span className="post-internship-error-text">{errors.description.message}</span>
            )}
            <span
              className={`post-internship-char-counter ${
                descriptionValue.length >= DESCRIPTION_MAX_LENGTH
                  ? "post-internship-char-counter-limit"
                  : ""
              }`}
            >
              {descriptionValue.length}/{DESCRIPTION_MAX_LENGTH}
            </span>
          </div>
        </div>

        <div className="post-internship-row">
          <div className="post-internship-field">
            <label htmlFor="capacity">Capacity</label>
            <input id="capacity" type="number" min="1" {...register("capacity")} />
            {errors.capacity && (
              <span className="post-internship-error-text">{errors.capacity.message}</span>
            )}
          </div>

          <div className="post-internship-field">
            <label htmlFor="location">Location</label>
            <input id="location" type="text" {...register("location")} />
            {errors.location && (
              <span className="post-internship-error-text">{errors.location.message}</span>
            )}
          </div>
        </div>

        <div className="post-internship-row">
          <div className="post-internship-field">
            <label htmlFor="startDate">Start Date</label>
            <input id="startDate" type="date" {...register("startDate")} />
            {errors.startDate && (
              <span className="post-internship-error-text">{errors.startDate.message}</span>
            )}
          </div>

          <div className="post-internship-field">
            <label htmlFor="endDate">End Date</label>
            <input id="endDate" type="date" {...register("endDate")} />
            {errors.endDate && (
              <span className="post-internship-error-text">{errors.endDate.message}</span>
            )}
          </div>
        </div>

        <div className="post-internship-actions">
          <button
            type="button"
            className="post-internship-btn-publish"
            disabled={isSubmitting}
            onClick={handleSubmit(onCreate)}
          >
            {isSubmitting ? "Saving..." : "Create Internship"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostInternship;