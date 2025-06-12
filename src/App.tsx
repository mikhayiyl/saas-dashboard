import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/users";
import Reports from "./pages/reports";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<div>Settings Page</div>} />
      </Route>
    </Routes>
  );
}

export default App;
