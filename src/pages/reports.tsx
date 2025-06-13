import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarDateRangePicker } from "@/components/ui/CalendarRangeDatePicker";
import { ReportsSummary } from "@/components/reports/ReportsSummary";
import { Download } from "lucide-react";
import type { DateRange } from "react-day-picker";

const Reports = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const handleDownload = () => {
    const csvContent = [
      ["Label", "Value", "Change"],
      ...ReportsSummary.getFilteredData(search).map((item) => [
        item.label,
        item.value,
        item.change,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64"
          />
          <CalendarDateRangePicker value={date} onChange={setDate} />
        </div>
        <Button onClick={handleDownload} className="w-full sm:w-auto">
          <Download className="w-4 h-4 mr-2" /> Download Report
        </Button>
      </div>

      <ReportsSummary search={search} date={date} />
    </div>
  );
};

export default Reports;
