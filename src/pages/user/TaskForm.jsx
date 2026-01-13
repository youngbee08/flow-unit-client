import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import api from "../../helpers/api";
import { toast } from "sonner";

const TaskForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Please provide task name")
      .min(7, "Task name must be more than 7 characters"),
    description: yup
      .string()
      .required("Please provide task description")
      .min(20, "Task description must be more than 20 characters"),
    dueDate: yup
      .string()
      .required("Please provide task due date")
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
      dueDate: "",
      projectID: id,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        const res = await api.post("/user/createTask", values);
        if (res.status === 200 || res.status === 201) {
          toast.success("Task added successful");
          resetForm();
          setTimeout(() => {
            const loading = toast.loading("Redirecting...");
            setTimeout(() => {
              toast.dismiss(loading);
              navigate(-1);
            }, 1300);
          }, 500);
        }
      } catch (error) {
        // console.log("errorAddingTask", error);
        const errMessage =
          error.response.data.message || error.message || "Failed to add task";
        toast.error(errMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className="flex flex-col gap-5 lg:gap-9">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-9">
          <div className="grid lg:grid-cols-2 gap-x-5 gap-y-2">
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
                htmlFor="name"
                className="text-sm lg:text-base font-semibold"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                className="w-full lg:w-auto rounded-xl border border-primary px-3 py-3 focus:ring-primary focus:outline-none focus:border-primary transition-all text-tetiary placeholder-slate-400 focus:ring-2"
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
              htmlFor="name"
              className="text-sm lg:text-base font-semibold"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
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
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => {
                navigate(-1);
              }}
              disabled={formik.isSubmitting}
              className="px-6 py-2 bg-primary/10 rounded-xl border border-primary text-xs lg:text-sm font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-primary text-white rounded-xl text-xs lg:text-sm font-medium cursor-pointer"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Adding Task..." : "Add Task"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
