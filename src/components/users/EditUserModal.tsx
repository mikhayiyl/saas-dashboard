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

import type { User } from "@/types/User";

// Validation schema
const userSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.string().min(1, "Role is required"),
});

type FormData = z.infer<typeof userSchema>;

const EditUserModal: React.FC<{
  user?: User;
  users: User[];
  onEdit: (user: User) => void;
  onClose: () => void;
}> = ({ user, onEdit, onClose, users }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>({
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
    });
  }, [user, reset]);

  const onSubmit = (data: FormData) => {
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
      lastSeen: user?.lastSeen ?? Date.now(),
    });
  };

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
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" {...register("role")} autoComplete="off" />
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
