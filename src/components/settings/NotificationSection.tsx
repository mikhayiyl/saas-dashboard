import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { SettingsForm } from "@/types/SettingForm";

type Props = {
  form: SettingsForm;
  setForm: React.Dispatch<React.SetStateAction<SettingsForm>>;
};

const NotificationSection = ({ form, setForm }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Email Notifications</Label>
          <Switch
            checked={form.emailNotifications}
            onCheckedChange={(checked) =>
              setForm((prev) => ({ ...prev, emailNotifications: checked }))
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <Label>Monthly Report Summaries</Label>
          <Switch
            checked={form.monthlyReports}
            onCheckedChange={(checked) =>
              setForm((prev) => ({ ...prev, monthlyReports: checked }))
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSection;
