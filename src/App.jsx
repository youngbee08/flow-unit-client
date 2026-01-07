import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./helpers/ProtectedRoute";
import DashboardsLayout from "./layouts/DashboardsLayout";
import Overview from "./pages/user/Overview";
import Tasks from "./pages/user/Tasks";
import Projects from "./pages/user/Projects";
import Teams from "./pages/user/Teams";
import SingleProject from "./pages/user/SingleProject";
import TaskForm from "./pages/user/TaskForm";
import NewProject from "./pages/user/NewProject";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route
          path="/dashboard/overview"
          element={
            <ProtectedRoute>
              <DashboardsLayout children={<Overview />} pageName={"Overview"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/tasks"
          element={
            <ProtectedRoute>
              <DashboardsLayout
                children={<Tasks />}
                pageName={"Assigned Tasks"}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/projects"
          element={
            <ProtectedRoute>
              <DashboardsLayout
                children={<Projects />}
                pageName={"All Projects"}
                pageUtility={{
                  active: true,
                  info: "Create new Project",
                  shortcut: "/dashboard/projects/new",
                }}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/projects/new"
          element={
            <ProtectedRoute>
              <DashboardsLayout
                children={<NewProject />}
                pageName={"Add new project"}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/projects/:id"
          element={
            <ProtectedRoute>
              <DashboardsLayout
                children={<SingleProject />}
                pageName={"Project Details"}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/projects/:id/addTask"
          element={
            <ProtectedRoute>
              <DashboardsLayout
                children={<TaskForm />}
                pageName={"New Task"}
                pageInfo={
                  "Use the form below to add a new task to your project. Provide clear and accurate details to help track progress, assign responsibility, and keep everything organized. Once added, this task will become part of your project workflow and can be updated or managed at any time."
                }
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/team"
          element={
            <ProtectedRoute>
              <DashboardsLayout
                children={<Teams />}
                pageName={"Team Management"}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster expand closeButton visibleToasts={3} />
    </>
  );
};

export default App;
