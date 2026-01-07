import React from "react";
import Modal from "./Modal";
import { User } from "lucide-react";
import { toast } from "sonner";
import api from "../../helpers/api";
import * as yup from "yup";
import { useFormik } from "formik";

const EditProject = ({ isOpen, onCancel, project, otherAction }) => {
  if (!isOpen) return null;
  const validationSchema = yup.object({
    name: yup.string().required("Please proide project name"),
    description: yup.string().required("Please proide project description"),
    updateMessage: yup.string().required("Please provide update message"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: project.name || "",
      description: project.description || "",
      updateMessage: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const res = await api.patch(
          `/user/updateProject/${project._id}`,
          values
        );
        if (res.status === 200) {
          toast.success("Project updated successfully");
          otherAction();
          onCancel();
        }
      } catch (error) {
        console.log("errorUpdatingProject", error);
        const errMessage =
          error.response.data.message ||
          error.message ||
          "Failed to update project";
        toast.error(errMessage);
      }
    },
  });
  return (
    <Modal customMode showClose onClose={onCancel}>
      <div className="bg-white w-[460px] rounded-xl px-3 py-4 max-h-[400px] flex flex-col gap-4">
        <h3 className="text-sm lg:text-lg font-semibold">Edit Project</h3>
        <form
          className="flex flex-col gap-4 overflow-y-auto styled-scrollbar pr-3"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-tetiary placeholder-slate-400"
              placeholder="Provide project name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="name"
              name="name"
            />
            {formik.touched.name && formik.errors.name && (
              <span className="text-xs text-red-600 font-medium">
                {formik.errors.name}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              type="text"
              rows={3}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none transition-all text-tetiary placeholder-slate-400"
              placeholder="Provide project description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="description"
              name="description"
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <span className="text-xs text-red-600 font-medium">
                {formik.errors.description}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="updateMessage" className="text-sm font-medium">
              Update Message
            </label>
            <textarea
              type="text"
              rows={3}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none transition-all text-tetiary placeholder-slate-400"
              placeholder="Provide project latest changes"
              value={formik.values.updateMessage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="updateMessage"
              name="updateMessage"
            ></textarea>
            {formik.touched.updateMessage && formik.errors.updateMessage && (
              <span className="text-xs text-red-600 font-medium">
                {formik.errors.updateMessage}
              </span>
            )}
          </div>
          <div className="flex justify-end items-center gap-4">
            <button
              disabled={formik.isSubmitting}
              className="bg-primary/10 px-3 py-2.5 cursor-pointer rounded-md"
              onClick={() => {
                onCancel();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-primary text-white px-3 py-2.5 cursor-pointer rounded-md"
            >
              {formik.isSubmitting ? "Saving" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditProject;
