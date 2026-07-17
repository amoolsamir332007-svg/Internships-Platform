import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { internshipSchema } from "../../../schemas/internshipSchema";
import { createInternship } from "../../../api/internshipService";
import "./InstitutionDash.css";
 
// NOTE: the backend has no "draft" vs "publish" concept for opportunities
// (only POST /Institution/opportunities to create one). The old
// "Save as Draft" / "Submit and Publish" split called an endpoint that
// doesn't exist, so this now just creates the opportunity directly.
// If a draft/publish workflow is actually needed, that has to be added
// on the backend first.
const PostInternship = () => {
  const navigate = useNavigate();
 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(internshipSchema),
  });
 
  const onCreate = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Send dates as explicit UTC ISO strings (ending in "Z") rather
      // than relying on the browser/axios to serialize a Date object
      // "correctly" — the backend's Postgres column is
      // "timestamp with time zone" and only accepts UTC. This is the
      // frontend half of the fix; the backend still needs to make sure
      // it treats an incoming UTC value as UTC (see DbUpdateException /
      // "Cannot write DateTime with Kind=Local" in the server logs).
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
        {/* عنوان التدريب */}
        <div className="post-internship-field">
          <label htmlFor="title">Title</label>
          <input id="title" type="text" {...register("title")} />
          {errors.title && <span className="post-internship-error-text">{errors.title.message}</span>}
        </div>
 
        {/* وصف التدريب */}
        <div className="post-internship-field">
          <label htmlFor="description">Description</label>
          <textarea id="description" rows="5" {...register("description")} />
          {errors.description && (
            <span className="post-internship-error-text">{errors.description.message}</span>
          )}
        </div>
 
        {/* السعة + الموقع بنفس الصف */}
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