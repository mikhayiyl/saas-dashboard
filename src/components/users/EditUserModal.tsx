import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const EditUserDialog: React.FC<{
  user: User;
  onEdit: (user: User) => void;
  onClose: () => void;
}> = ({ user, onEdit, onClose }) => {
  const handleEdit = () => {
    console.log("Editing user:", user);
    onEdit(user);
  };

  const handleClose = () => {
    console.log("Closing dialog for user:", user.name);
    onClose();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
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
            <Input id="name" name="name" defaultValue={user.name} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" defaultValue={user.email} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="role">Role</Label>
            <Input id="role" name="role" defaultValue={user.role} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleEdit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
