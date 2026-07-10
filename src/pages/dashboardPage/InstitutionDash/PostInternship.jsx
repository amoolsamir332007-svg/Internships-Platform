import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { internshipSchema } from "../../../schemas/internshipSchema";
import { createInternship, publish } from "../../../api/internshipService";
import "./InstitutionDash.css";
 
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
 
  const onSaveDraft = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await createInternship(formData);
      navigate("/dashboard/institution/manage-internships");
    } catch (err) {
      setSubmitError(err.response?.data?.message || "An error occurred while saving the internship");
    } finally {
      setIsSubmitting(false);
    }
  };
 
  const onPublish = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await createInternship(formData);
      const newInternshipId = response.data.id;
      await publish(newInternshipId);
      navigate("/dashboard/institution/manage-internships");
    } catch (err) {
      setSubmitError(err.response?.data?.message || "An error occurred while publishing the internship");
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
 
        {/* المتطلبات */}
        <div className="post-internship-field">
          <label htmlFor="requirements">Requirements</label>
          <textarea id="requirements" rows="4" {...register("requirements")} />
          {errors.requirements && (
            <span className="post-internship-error-text">{errors.requirements.message}</span>
          )}
        </div>
 
        {/* الموقع + المدة بنفس الصف */}
        <div className="post-internship-row">
          <div className="post-internship-field">
            <label htmlFor="location">Location</label>
            <input id="location" type="text" {...register("location")} />
            {errors.location && (
              <span className="post-internship-error-text">{errors.location.message}</span>
            )}
          </div>
 
          <div className="post-internship-field">
            <label htmlFor="duration">Duration</label>
            <input id="duration" type="text" placeholder="Example: 3 months" {...register("duration")} />
            {errors.duration && (
              <span className="post-internship-error-text">{errors.duration.message}</span>
            )}
          </div>
        </div>
 
        <div className="post-internship-row">
          <div className="post-internship-field">
            <label htmlFor="deadline">Application Deadline</label>
            <input id="deadline" type="date" {...register("deadline")} />
            {errors.deadline && (
              <span className="post-internship-error-text">{errors.deadline.message}</span>
            )}
          </div>
 
          <div className="post-internship-field post-internship-checkbox">
            <label htmlFor="isPaid">Paid Internship?</label>
            <input id="isPaid" type="checkbox" {...register("isPaid")} />
          </div>
        </div>
 
        <div className="post-internship-actions">
          <button
            type="button"
            className="post-internship-btn-draft"
            disabled={isSubmitting}
            onClick={handleSubmit(onSaveDraft)}
          >
            Save as Draft 
          </button>
 
          <button
            type="button"
            className="post-internship-btn-publish"
            disabled={isSubmitting}
            onClick={handleSubmit(onPublish)}
          >
           Submit and Publish
          </button>
        </div>
      </form>
    </div>
  );
};
 
export default PostInternship;