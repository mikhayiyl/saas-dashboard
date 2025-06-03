import { Outlet } from "react-router-dom";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="p-4 overflow-y-auto flex-1 bg-muted">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
