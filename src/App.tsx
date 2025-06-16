import MainLayout from "@/layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/reports";
import UsersPage from "./pages/users";
import SettingsPage from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
