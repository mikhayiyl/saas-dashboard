import DownloadReports from "@/components/reports/DownloadReports";
import ReportsSummary from "@/components/reports/ReportsSummary";

const Reports = () => {
  return (
    <div className="p-4 max-w-screen-lg mx-auto space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-xl font-semibold">Reports</h1>
        <DownloadReports />
      </header>

      <section>
        <ReportsSummary />
      </section>

      {/* You can add: recent exports, email logs, etc. */}
    </div>
  );
};

export default Reports;
