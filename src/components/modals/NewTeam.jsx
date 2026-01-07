import React from "react";
import Modal from "./Modal";
import { User } from "lucide-react";
import { toast } from "sonner";
import api from "../../helpers/api";
import * as yup from "yup";
import { useFormik } from "formik";

const NewTeam = ({ isOpen, onCancel, otherAction }) => {
  if (!isOpen) return null;
  const validationSchema = yup.object({
    name: yup.string().required("Please proide team name"),
    about: yup
      .string()
      .required("Please proide team about info")
      .min(120, "Team description should be at least 120 characters"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const res = await api.post(`/user/createTeam`, values);
        if (res.status === 201 || res.status === 200) {
          toast.success("Team created successfully");
          otherAction();
          onCancel();
        }
      } catch (error) {
        console.log("errorCreatingTeam", error);
        const errMessage =
          error.response.data.message ||
          error.message ||
          "Failed to create team";
        toast.error(errMessage);
      }
    },
  });
  return (
    <Modal customMode showClose onClose={onCancel}>
      <div className="bg-white w-[460px] rounded-xl px-3 py-4 max-h-[400px] flex flex-col gap-4">
        <h3 className="text-sm lg:text-lg font-semibold">Create Team</h3>
        <form
          className="flex flex-col gap-4 overflow-y-auto styled-scrollbar pr-3"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Team name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-tetiary placeholder-slate-400"
              placeholder="Provide team name"
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
            <label htmlFor="about" className="text-sm font-medium">
              About info
            </label>
            <textarea
              type="text"
              rows={3}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none transition-all text-tetiary placeholder-slate-400"
              placeholder="Provide team about info"
              value={formik.values.about}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="about"
              name="about"
            ></textarea>
            {formik.touched.about && formik.errors.about && (
              <span className="text-xs text-red-600 font-medium">
                {formik.errors.about}
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
              {formik.isSubmitting ? "Creating Team..." : "Create Team"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewTeam;
