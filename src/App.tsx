import MainLayout from "@/layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/reports";
import UsersPage from "./pages/users";
import SettingsPage from "./pages/Settings";
import { Toaster } from "sonner";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />;
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
