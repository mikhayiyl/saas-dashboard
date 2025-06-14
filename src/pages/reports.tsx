import DownloadReports from "@/components/reports/DownloadReports";
import { ReportsSummary } from "@/components/reports/ReportsSummary";
import { CalendarDateRangePicker } from "@/components/ui/CalendarRangeDatePicker";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

const Reports = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

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
        <DownloadReports search={search} />
      </div>

      <ReportsSummary search={search} date={date} />
    </div>
  );
};

export default Reports;
