import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import useReportsData from "./reportsData"; // now a hook (useReportsData)

const DownloadReports = ({ search = "" }: { search?: string }) => {
  const data = useReportsData(); // ✅ Call the hook here

  const handleDownload = () => {
    const filteredData = data.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredData.length === 0) {
      alert("No data to download.");
      return;
    }

    const csvContent = [
      ["Label", "Value", "Change"],
      ...filteredData.map((item) => [
        `"${item.label}"`,
        `"${item.value}"`,
        `"${item.change}"`,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={handleDownload} className="flex items-center gap-2">
      <Download className="w-4 h-4" />
      Download
    </Button>
  );
};

export default DownloadReports;
