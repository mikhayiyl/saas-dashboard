import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Link, useNavigate } from "react-router-dom";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(res.user.getIdToken.toString());
      toast.success("Logged in successfully!");
      //   navigate("/dashboard");
    } catch (error: any) {
      0;
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleResetPassword = async () => {
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent!");
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 border rounded-lg shadow-lg space-y-6 w-full max-w-sm bg-white"
    >
      <h2 className="text-lg font-semibold text-center">
        Login to your account
      </h2>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            autoComplete="email"
            className="w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            autoComplete="current-password"
            className="w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>

      <div className="text-sm text-center text-muted-foreground flex flex-col gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="text-primary">
              Forgot Password?
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Enter your email to receive reset instructions.
            </DialogDescription>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>
            <Button
              onClick={handleResetPassword}
              className="w-full"
              disabled={resetLoading}
            >
              {resetLoading ? "Sending..." : "Send Reset Email"}
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="w-full mt-2">
                Close
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>

        <Link
          to={"/register"}
          className="cursor-pointer text-primary underline"
        >
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
