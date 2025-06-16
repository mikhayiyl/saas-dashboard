import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { deleteUserAccount } from "@/lib/deleteAccount";
import { resetBusinessData } from "@/lib/resetBusinness";

const DangerZone = () => {
  const [showResetModal, setShowResetModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleResetData = async () => {
    try {
      await resetBusinessData();
      toast.success("All business data has been cleared.");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while resetting data.");
    } finally {
      setShowResetModal(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount();
      toast.success("Your account has been deleted.");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete account.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <Card className="border-red-500">
      <CardHeader>
        <CardTitle className="text-red-500 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Danger Zone
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Reset all business data, including products, analytics, and sales
            reports.
          </p>
          <Dialog open={showResetModal} onOpenChange={setShowResetModal}>
            <DialogTrigger asChild>
              <Button variant="outline">Reset Business Data</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Reset</DialogTitle>
                <DialogDescription>
                  This will permanently delete all dashboard data. This cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="ghost"
                  onClick={() => setShowResetModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleResetData}>
                  Yes, Reset Data
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground mb-2">
            Permanently delete your admin account. This action is irreversible.
          </p>
          <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Account?</DialogTitle>
                <DialogDescription>
                  This will delete your admin account permanently. You will be
                  logged out.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="ghost"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  Yes, Delete Account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default DangerZone;
