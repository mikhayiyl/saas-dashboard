import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerAndCreateUser } from "@/lib/firebaseUsers";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerAndCreateUser(data);
      toast.success("Account created! Welcome to SimplizerPro!");
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 border rounded-lg shadow-lg space-y-6 w-full max-w-sm bg-white"
    >
      <h2 className="text-lg font-semibold text-center">Create an Account</h2>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            {...register("name", { required: "Full Name is required" })}
            className="w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            autoComplete="new-password"
            className="w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </Button>

      <p className="text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <Link to={"/login"} className="cursor-pointer text-primary underline">
          Login
        </Link>
      </p>
    </form>
  );
}
