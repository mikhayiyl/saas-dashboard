import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("You have been logged out.");
      navigate("/login", { replace: true });
    } catch (error: any) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <p className="text-lg">Are you sure you want to logout?</p>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Yes, Logout
      </button>
    </div>
  );
};
export default LogoutPage;
