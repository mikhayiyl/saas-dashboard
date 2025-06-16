import { useState } from "react";
import { Button } from "@/components/ui/button";
import AccountSection from "@/components/settings/AccountSection";
import PreferencesSection from "@/components/settings/PreferencesSection";
import NotificationSection from "@/components/settings/NotificationSection";
import type { SettingsForm } from "@/types/SettingForm";
import DangerZone from "@/components/settings/DangerZone";

const SettingsPage = () => {
  const [form, setForm] = useState<SettingsForm>({
    company: "SimplizerPro",
    email: "support@simplizerpro.com",
    phone: "+254700000000",
    currency: "KES",
    taxRate: "0",
    emailNotifications: true,
    monthlyReports: true,
  });

  const handleSave = () => {
    console.log("Saving settings...");
    // TODO: Save to Firebase or localStorage
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Settings</h2>

      <AccountSection form={form} setForm={setForm} />
      <PreferencesSection form={form} setForm={setForm} />
      <NotificationSection form={form} setForm={setForm} />
      <DangerZone />

      <div className="text-right">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
