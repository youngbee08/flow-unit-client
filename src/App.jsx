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
import Notifications from "./pages/user/Notifications";
import ProfileSettings from "./pages/user/ProfileSettings";
import Signup from "./pages/auth/Signup";
import VerifyEmail from "./pages/auth/VerifyAccount";
import Invitation from "./pages/backend/Invitation";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import NotFound from "./pages/NotFound";
import TaskGenerator from "./pages/user/TaskGenerator";
import TaskSmartGenerator from "./pages/user/TaskSmartGenerator";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/create-account" element={<Signup />} />

        <Route path="/verify-account" element={<VerifyEmail />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/invitation/:teamId/"
          element={
            <ProtectedRoute>
              <Invitation />
            </ProtectedRoute>
          }
        />

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
          path="/dashboard/tasks/smart-generator"
          element={
            <ProtectedRoute>
              <DashboardsLayout
                children={<TaskSmartGenerator />}
                pageName={"AI Task Generator"}
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
          path="/dashboard/projects/:id/ai/addTask"
          element={
            <ProtectedRoute>
              <DashboardsLayout
                children={<TaskGenerator />}
                pageName={"AI Task Generator"}
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
        <Route
          path="/dashboard/notifications"
          element={
            <ProtectedRoute>
              <DashboardsLayout
                children={<Notifications />}
                pageName={"Notifications"}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile-settings"
          element={
            <ProtectedRoute>
              <DashboardsLayout
                children={<ProfileSettings />}
                pageName={"Account Settings"}
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
