import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { User, UserInput } from "@/types/User";

// Validation schema
const userSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.string().min(1, "Role is required"),
  password: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || val.length >= 6, {
      message: "Password cannot be less than 6 characters",
    }), //to make password optional during editting
});

type UserFormData = z.infer<typeof userSchema>;

const EditUserModal: React.FC<{
  user?: User;
  users: User[];
  onEdit: (user: UserInput) => void;
  onClose: () => void;
}> = ({ user, onEdit, onClose, users }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      role: user?.role ?? "",
    },
  });

  useEffect(() => {
    reset({
      name: user?.name ?? "",
      email: user?.email ?? "",
      role: user?.role ?? "",
      password: "",
    });
  }, [user, reset]);

  const onSubmit = (data: UserFormData) => {
    const isEmailTaken = users.some(
      (u) => u.email === data.email && u.id !== user?.id
    );

    if (isEmailTaken) {
      setError("email", {
        type: "manual",
        message: "This email is already in use by another user.",
      });
      return;
    }

    onEdit({
      id: user?.id!,
      name: data.name,
      email: data.email,
      role: data.role,
      password: data.password ?? "",
      lastSeen: user?.lastSeen ?? Date.now(),
    });
  };

  const isEditing = Boolean(user?.id);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className="text-lg font-semibold">
              {user ? "Edit User" : "Add User"}
            </h2>
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700 dark:text-gray-300">
            {user
              ? "Modify the user details below."
              : "Fill in the form to create a new user."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} autoComplete="name" />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          {!isEditing && (
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
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <select {...register("role")}>
              <option value="">Roles</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>
          <DialogFooter className="flex flex-col md:flex-row gap-2 mt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                type="button"
                className="w-full md:w-auto"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="w-full md:w-auto">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
