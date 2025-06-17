import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        toast.success("Logged out successfully!");
        navigate("/login");
      } catch (error: any) {
        toast.error(`Error: ${error.message}`);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 border rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-semibold">Logging out...</h2>
        <p className="text-sm text-muted-foreground">Redirecting to login...</p>
        <Button
          variant="outline"
          onClick={() => navigate("/login")}
          className="mt-4"
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default Logout;
