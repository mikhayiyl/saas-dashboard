import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SettingsForm } from "@/types/SettingForm";

type Props = {
  settings: SettingsForm;
  setSettings: React.Dispatch<React.SetStateAction<SettingsForm>>;
};

const PreferencesSection = ({ settings, setSettings }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Currency</Label>
          <Input
            value={settings.currency}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, currency: e.target.value }))
            }
          />
        </div>
        <div>
          <Label>VAT / Tax Rate (%)</Label>
          <Input
            type="number"
            value={settings.taxRate}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, taxRate: e.target.value }))
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferencesSection;
