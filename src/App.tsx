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
import ProtectedRoute from "@/components/ProtectedRoute";
import LogoutPage from "./pages/Logout";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Public routes */}
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />

        {/* Protected routes */}
        <Route path="/" element={<MainLayout />}>
          <Route
            path="logout"
            element={
              <ProtectedRoute>
                <LogoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="team"
            element={
              <ProtectedRoute>
                <Team />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
