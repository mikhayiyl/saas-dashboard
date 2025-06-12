import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
  { label: "Sales", value: "$22,870", change: "+8%" },
  { label: "Returns", value: "$1,245", change: "-3%" },
  { label: "New Users", value: "712", change: "+12%" },
];

const ReportsSummary = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {metrics.map((item) => (
        <Card key={item.label}>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              {item.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{item.value}</div>
            <p className="text-xs text-gray-500">
              {item.change} from last period
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReportsSummary;
