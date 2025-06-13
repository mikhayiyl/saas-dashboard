import { Outlet } from "react-router-dom";
import Sidebar from "@/components/navbar/Sidebar";
import Topbar from "@/components/navbar/Topbar";

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
