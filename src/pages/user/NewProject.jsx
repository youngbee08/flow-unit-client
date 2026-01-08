import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "sonner";
import FormDropdown from "../../components/FormDropdown";
import api from "../../helpers/api";
import { useNavigate } from "react-router-dom";
import EditProject from "../../components/modals/EditProject";

const NewProject = () => {
  const [projectOptions, setProjectOptions] = useState("Select project type");
  const [priorityOptions, setPriorityOptions] = useState(
    "Select priority level"
  );
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required("Please provide project name"),
    projectType: Yup.string().required("Please provide project type"),
    priorityLevel: Yup.string().required(
      "Please provide project priority level"
    ),
    description: Yup.string().required("Please provide project description"),
    notes: Yup.string(),
    startDate: Yup.string().required("Please provide project start date"),
    dueDate: Yup.string()
      .required("Please provide project due date")
      .test("not-past-date", "Due date cannot be in the past", (value) => {
        if (!value) return false;
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      }),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      notes: "",
      dueDate: "",
      priorityLevel: "",
      projectType: "",
      startDate: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const res = await api.post(
          `/user/createProject?type=${values.projectType}`,
          values
        );
        if (res.status === 200 || res.status === 201) {
          toast.success("Project added successful");
          setTimeout(() => {
            const loading = toast.loading("Redirecting...");
            setTimeout(() => {
              toast.dismiss(loading);
              navigate("/dashboard/overview");
            }, 1300);
          }, 500);
        }
      } catch (error) {
        console.log("errorAddingProject", error);
        const errMessage =
          error.response.data.message ||
          error.message ||
          "Failed to add project";
        toast.error(errMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
        <div className="grid lg:grid-cols-2 w-full gap-x-5 gap-y-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm lg:text-base font-semibold"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Website Redesign Q4"
              className="rounded-xl border border-primary px-3 py-3 focus:ring-primary focus:outline-none focus:border-primary transition-all text-tetiary placeholder-slate-400 focus:ring-2"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <span className="text-xs text-red-600 font-medium">
                {formik.errors.name}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="projectType"
              className="text-sm lg:text-base font-semibold"
            >
              Project Type
            </label>
            <FormDropdown
              value={projectOptions}
              onChange={(val) => {
                setProjectOptions(val);
                formik.setFieldValue(
                  "projectType",
                  val !== "Select project type" ? val.toLowerCase() : ""
                );
                formik.setFieldTouched("projectType", true);
              }}
              options={["Select project type", "Team", "Personal"]}
            />
            {formik.touched.projectType && formik.errors.projectType && (
              <span className="text-xs text-red-600 font-medium">
                {formik.errors.projectType}
              </span>
            )}
          </div>
        </div>
        <div className="grid lg:grid-cols-2 w-full gap-x-5 gap-y-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="startDate"
              className="text-sm lg:text-base font-semibold"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="rounded-xl border lg:w-auto w-full border-primary px-3 py-3 focus:ring-primary focus:outline-none focus:border-primary transition-all text-tetiary placeholder-slate-400 focus:ring-2"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.startDate && formik.errors.startDate && (
              <span className="text-xs text-red-600 font-medium">
                {formik.errors.startDate}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="dueDate"
              className="text-sm lg:text-base font-semibold"
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="rounded-xl border lg:w-auto w-full border-primary px-3 py-3 focus:ring-primary focus:outline-none focus:border-primary transition-all text-tetiary placeholder-slate-400 focus:ring-2"
              value={formik.values.dueDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dueDate && formik.errors.dueDate && (
              <span className="text-xs text-red-600 font-medium">
                {formik.errors.dueDate}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="projectType"
            className="text-sm lg:text-base font-semibold"
          >
            Priority Level
          </label>
          <FormDropdown
            value={priorityOptions}
            onChange={(val) => {
              setPriorityOptions(val);
              formik.setFieldValue(
                "priorityLevel",
                val !== "Select priority level" ? val.toLowerCase() : ""
              );
              formik.setFieldTouched("priorityLevel", true);
            }}
            options={["Select priority level", "High", "Low", "Medium"]}
          />
          {formik.touched.priorityLevel && formik.errors.priorityLevel && (
            <span className="text-xs text-red-600 font-medium">
              {formik.errors.priorityLevel}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm lg:text-base font-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe the project aim and objectives..."
            rows={3}
            className="rounded-xl border border-primary px-3 py-3 focus:ring-primary focus:outline-none focus:border-primary transition-all text-tetiary resize-none placeholder-slate-400 focus:ring-2"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.touched.description && formik.errors.description && (
            <span className="text-xs text-red-600 font-medium">
              {formik.errors.description}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="px-4 py-3 cursor-pointer text-sm lg:text-base font-medium bg-primary text-white rounded-xl"
        >
          {formik.isSubmitting ? "Creating Project..." : "Create Project"}
        </button>
      </form>
    </>
  );
};

export default NewProject;
