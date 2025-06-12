import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  lastSeen: number;
};

const EditUserModal: React.FC<{
  user: User;
  onEdit: (updated: User) => void;
  onClose: () => void;
}> = ({ user, onEdit, onClose }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  }, [user]);

  const handleSave = () => {
    const updatedUser: User = {
      ...user,
      name,
      email,
      role,
    };
    onEdit(updatedUser);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Modify the user details and save changes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col md:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full md:w-auto"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="w-full md:w-auto">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
