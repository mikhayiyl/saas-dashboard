import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const DangerZone = () => {
  const handleDeleteAccount = () => {
    const confirmDelete = confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone."
    );

    if (confirmDelete) {
      // TODO: Implement delete logic (Firebase / API)
      console.log("Account deleted");
    }
  };

  const handleResetData = () => {
    const confirmReset = confirm(
      "This will erase all your business data and start fresh. Proceed?"
    );

    if (confirmReset) {
      // TODO: Implement reset logic
      console.log("Data reset");
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
            Reset all business data, including orders, products, and customers.
          </p>
          <Button variant="outline" onClick={handleResetData}>
            Reset Business Data
          </Button>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground mb-2">
            Permanently delete your account. This action is irreversible.
          </p>
          <Button variant="destructive" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DangerZone;
