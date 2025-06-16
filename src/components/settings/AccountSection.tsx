import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SettingsForm } from "@/types/SettingForm";

type Props = {
  settings: SettingsForm;
  setSettings: React.Dispatch<React.SetStateAction<SettingsForm>>;
  handleChange: (field: string, vhandleChange: string | boolean) => void;
};

const AccountSection = ({ settings: form, handleChange }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Company Name</Label>
          <Input
            value={form.company}
            onChange={(e) => handleChange("company", e.target.value)}
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div>
          <Label>Phone</Label>
          <Input
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSection;
