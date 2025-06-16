import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { SettingsForm } from "@/types/SettingForm";

type Props = {
  settings: SettingsForm;
  handleChange: (field: string, vhandleChange: string | boolean) => void;
};

const NotificationSection = ({ settings, handleChange }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Email Notifications</Label>
          <Switch
            checked={settings.emailNotifications}
            onCheckedChange={(checked) =>
              handleChange("emailNotifications", checked)
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <Label>Monthly Report Summaries</Label>
          <Switch
            checked={settings.monthlyReports}
            onCheckedChange={(checked) =>
              handleChange("monthlyReports", checked)
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSection;
