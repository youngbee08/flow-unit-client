import { FaTrash } from "react-icons/fa6";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import TaskGenLoading from "../../components/TaskGenLoading";
import { toast } from "sonner";
import api from "../../helpers/api";
import { useNavigate, useParams } from "react-router-dom";
import { LuRefreshCw, LuSendToBack } from "react-icons/lu";

const TaskGenerator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [generatingTasks, setGeneratingTasks] = useState(false);
  const generateTasksOtions = async () => {
    setGeneratingTasks(true);
    try {
      const res = await api.post(`/ai/task-options/${id}`);
      if (res.status === 200) {
        formik.setFieldValue("tasks", res.data.taskList);
        const div = document.getElementById("tasksController");
        const rect = div.getBoundingClientRect();
        const absoluteBottom = window.scrollY + rect.bottom;
        window.scrollTo({
          top: absoluteBottom,
          behavior: "smooth",
        });
      }
    } catch (error) {
      console.log(("error-generating-task-options", error));
      const errMessg =
        error.response.data.message ||
        error.message ||
        "Failed to generate task options";
      toast.error(errMessg);
    } finally {
      setGeneratingTasks(false);
    }
  };
  const validationSchema = yup.object({
    tasks: yup
      .array()
      .of(
        yup.object({
          title: yup.string().required("Please provide task title"),
          description: yup.string().required("Please provide task description"),
        }),
      )
      .min(1, "Add at least one task")
      .required("Tasks are required"),
  });
  const formik = useFormik({
    initialValues: {
      tasks: [
        {
          title: "",
          description: "",
        },
      ],
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        const payload = {
          projectID: id,
          tasks: values.tasks,
        };
        const res = await api.post("/ai/generateTasks", payload);
        if (res.status === 201) {
          toast.success(
            res.data.message || "Tasks inserted into project successfully.",
          );
          resetForm();
          navigate(`/dashboard/projects/${id}`);
        }
      } catch (error) {
        console.log("errorGeneratingTask", error);
        const errMessg =
          error.response.data.message ||
          error.message ||
          "Failed to generate task options";
        toast.error(errMessg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleDeleteRow = (indexToRemove) => {
    formik.setFieldValue(
      "tasks",
      formik.values.tasks.filter((_, i) => i !== indexToRemove),
    );
  };
  useEffect(() => {
    generateTasksOtions();
  }, []);

  return generatingTasks ? (
    <TaskGenLoading intervalMs={1400} />
  ) : (
    <div className="flex flex-col gap-3">
      <div className="hidden sm:flex lg:flex items-center gap-4 justify-between">
        <h2 className="text-sm lg:text-base uppercase font-semibold">
          Task title
        </h2>
        <h2 className="w-[70%] text-sm lg:text-base uppercase font-semibold">
          Task description
        </h2>
      </div>
      <div className="flex flex-col gap-4" id="tasksController">
        {formik.values.tasks.map((t, index) => (
          <div
            key={index}
            className="border border-primary/10 rounded-xl px-4 py-4 flex items-start gap-4 justify-between flex-col lg:flex-row sm:flex-row"
          >
            <div className="lg:w-auto w-full flex flex-col gap-1">
              <label className="text-xs sm:hidden lg:hidden">Title:</label>
              <input
                type="text"
                className="border border-primary/10 bg-white/30 rounded-xl px-4 py-2 outline-0"
                name={`tasks[${index}].title`}
                value={formik.values.tasks[index].title}
                onChange={formik.handleChange}
              />
              {formik.touched?.tasks?.[index]?.title &&
                formik.errors?.tasks?.[index]?.title && (
                  <span className="text-xs text-red-600 font-semibold">
                    {formik.errors.tasks[index].title}
                  </span>
                )}
            </div>
            <div className="w-full lg:w-[70%] flex flex-col gap-1">
              <label className="text-xs sm:hidden lg:hidden">
                Description:
              </label>
              <input
                type="text"
                className="border border-primary/10 bg-white/30 rounded-xl px-4 py-2 outline-0 lg:h-auto h-fit"
                name={`tasks[${index}].description`}
                value={formik.values.tasks[index].description}
                onChange={formik.handleChange}
              />
              {formik.touched?.tasks?.[index]?.description &&
                formik.errors?.tasks?.[index]?.description && (
                  <span className="text-xs text-red-600 font-semibold">
                    {formik.errors.tasks[index].description}
                  </span>
                )}
            </div>
            <button
              className="text-xs lg:text-sm font-semibold cursor-pointer my-auto lg:text-primary text-white lg:bg-transparent sm:bg-transparent sm:text-primary bg-primary flex items-center lg:p-0 px-4 py-2 rounded-xl gap-1"
              title="Reove Task"
              onClick={() => handleDeleteRow(index)}
              disabled={formik.values.tasks.length === 1}
            >
              <FaTrash />
              <span className="flex sm:hidden lg:hidden">Remove Task</span>
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={generateTasksOtions}
          className="bg-primary/10 text-primary text-xs lg:text-sm font-medium px-3 py-2 border border-primary rounded-xl cursor-pointer flex items-center gap-2"
        >
          <LuRefreshCw />
          Regenerate
        </button>
        <button
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
          onClick={formik.handleSubmit}
          className="bg-primary text-white text-xs lg:text-sm font-medium px-3 py-2 border border-primary rounded-xl cursor-pointer flex items-center gap-2 w-[120px] justify-center"
        >
          <LuSendToBack
            className={`${formik.isSubmitting ? "animate-pulse" : ""}`}
          />
          {formik.isSubmitting ? "Insert" : "Insert"}
        </button>
      </div>
    </div>
  );
};

export default TaskGenerator;
