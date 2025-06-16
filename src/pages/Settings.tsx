import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AccountSection from "@/components/settings/AccountSection";
import PreferencesSection from "@/components/settings/PreferencesSection";
import NotificationSection from "@/components/settings/NotificationSection";
import type { SettingsForm } from "@/types/SettingForm";
import DangerZone from "@/components/settings/DangerZone";
import { fetchSettings, saveSettings } from "@/lib/settingService";
import { toast } from "sonner";

const SettingsPage = () => {
  const [settings, setSettings] = useState<SettingsForm>({
    company: "company name",
    email: "support@company.com",
    phone: "+254700000000",
    currency: "KES",
    taxRate: "0",
    emailNotifications: true,
    monthlyReports: true,
  });

  useEffect(() => {
    fetchSettings().then((data) => {
      if (data) {
        setSettings((prev) => ({
          ...prev,
          ...data,
        }));
      }
    });
  }, []);

  const handleSave = async () => {
    try {
      await saveSettings(settings);
      toast.success("Settings saved successfully.");
    } catch (err) {
      toast.error("Failed to save settings.");
      console.error(err);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Settings</h2>

      <AccountSection
        handleChange={handleChange}
        settings={settings}
        setSettings={setSettings}
      />
      <PreferencesSection settings={settings} setSettings={setSettings} />
      <NotificationSection settings={settings} handleChange={handleChange} />

      <div className="text-right">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
      <DangerZone />
    </div>
  );
};

export default SettingsPage;
