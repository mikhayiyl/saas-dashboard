import MainLayout from "@/layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/reports";
import UsersPage from "./pages/users";
import SettingsPage from "./pages/Settings";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import Team from "./pages/Team";
import Products from "./pages/ProductsPage";
import Orders from "./pages/OrdersPage";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />;
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="reports" element={<Reports />} />
          <Route path="team" element={<Team />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
