import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/User";

interface ConfirmDeleteModalProps {
  user: User;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal = ({
  user,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) => {
  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription className="text-blue-700 dark:text-gray-300">
            This action cannot be undone. You are about to delete{" "}
            <strong className="font-semibold text-gray-900 dark:text-white">
              {user.name}
            </strong>{" "}
            permanently.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-4">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="w-full sm:w-auto"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
