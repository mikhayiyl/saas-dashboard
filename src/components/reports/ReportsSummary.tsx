import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DateRange } from "react-day-picker";

const data = [
  { label: "New Users", value: "1,024", change: "+12%" },
  { label: "Revenue", value: "KES 343,000", change: "+9.3%" },
  { label: "Refunds", value: "KES 17,400", change: "-2.8%" },
  { label: "Orders", value: "761", change: "+4.2%" },
  { label: "Top Product", value: "Bluetooth Speaker", change: "↑ 21%" },
];

type ReportsSummaryProps = {
  search: string;
  date?: DateRange;
};

export const ReportsSummary = ({ search, date }: ReportsSummaryProps) => {
  const filtered = data.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {filtered.map((item) => (
        <Card key={item.label}>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              {item.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{item.value}</p>
            <p className="text-xs text-gray-500">
              {item.change} from last period
            </p>
          </CardContent>
        </Card>
      ))}
      {filtered.length === 0 && (
        <p className="text-gray-500 text-sm col-span-full">No results found.</p>
      )}
    </div>
  );
};

// Optional: static method to access filtered data for export
ReportsSummary.getFilteredData = (search: string) => {
  return data.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );
};
