import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { DateRange } from "react-day-picker";
import reportsData from "./reportsData";

type ReportsSummaryProps = {
  search: string;
  date?: DateRange;
};

export const ReportsSummary = ({ search, date }: ReportsSummaryProps) => {
  const filtered = reportsData(date).filter((item) =>
    item.label.toLowerCase().startsWith(search.toLowerCase())
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
