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
