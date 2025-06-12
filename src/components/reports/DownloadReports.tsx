import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const DownloadReports = () => {
  const handleDownload = () => {
    console.log("Downloading report...");
    // TODO: Generate PDF/CSV and trigger file download
  };

  return (
    <Button onClick={handleDownload} className="flex items-center gap-2">
      <Download className="w-4 h-4" />
      Download
    </Button>
  );
};

export default DownloadReports;
