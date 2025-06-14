import { differenceInDays, subDays, isWithinInterval } from "date-fns";
import type { DateRange } from "react-day-picker";
import UseActiverUsers from "@/hooks/UseActiverUsers";
import UseLiveProducts from "@/hooks/UseLiveProducts";
import UseLiveRevenue from "@/hooks/UseLiveRevenue";

const reportsData = (date?: DateRange) => {
  const { data: revenueData } = UseLiveRevenue();
  const { data: products } = UseLiveProducts();
  const { data: activeUsers } = UseActiverUsers();

  const today = new Date();
  const from = date?.from || today;
  const to = date?.to || today;
  const rangeDays = differenceInDays(to, from) + 1;

  const previousFrom = subDays(from, rangeDays);
  const previousTo = subDays(to, rangeDays);

  const isInRange = (d: Date, start: Date, end: Date) =>
    isWithinInterval(d, { start, end });

  const getChange = (current: number, prev: number) => {
    if (prev === 0) return "+∞%";
    const change = ((current - prev) / prev) * 100;
    const symbol = change >= 0 ? "+" : "";
    return `${symbol}${change.toFixed(1)}%`;
  };

  // --- Revenue ---
  const revenueMock = (revenueData || []).map((item, i) => ({
    ...item,
    date: subDays(today, i),
  }));

  const currentRevenue = revenueMock
    .filter((r) => isInRange(r.date, from, to))
    .reduce((acc, r) => acc + r.revenue, 0);

  const previousRevenue = revenueMock
    .filter((r) => isInRange(r.date, previousFrom, previousTo))
    .reduce((acc, r) => acc + r.revenue, 0);

  // --- Users ---
  const usersMock = (activeUsers || []).map((u, i) => ({
    ...u,
    createdAt: subDays(today, i),
  }));

  const currentUsers = usersMock.filter((u) =>
    isInRange(u.createdAt, from, to)
  ).length;

  const previousUsers = usersMock.filter((u) =>
    isInRange(u.createdAt, previousFrom, previousTo)
  ).length;

  // --- Orders + Refunds + Top Product ---
  const productsMock = (products || []).map((p, i) => ({
    ...p,
    salesDate: subDays(today, i),
    returnsDate: subDays(today, i + 1),
  }));

  const currentOrders = productsMock
    .filter((p) => isInRange(p.salesDate, from, to))
    .reduce((acc, p) => acc + (p.sales || 0), 0);

  const previousOrders = productsMock
    .filter((p) => isInRange(p.salesDate, previousFrom, previousTo))
    .reduce((acc, p) => acc + (p.sales || 0), 0);

  const currentRefunds = productsMock
    .filter((p) => isInRange(p.returnsDate, from, to))
    .reduce((acc, p) => acc + (p.returns || 0), 0);

  const previousRefunds = productsMock
    .filter((p) => isInRange(p.returnsDate, previousFrom, previousTo))
    .reduce((acc, p) => acc + (p.returns || 0), 0);

  const currentTopProduct = productsMock
    .filter((p) => isInRange(p.salesDate, from, to))
    .sort((a, b) => b.sales - a.sales)[0];

  const previousTopProduct = productsMock
    .filter((p) => isInRange(p.salesDate, previousFrom, previousTo))
    .sort((a, b) => b.sales - a.sales)[0];

  const topProductChange = previousTopProduct
    ? getChange(currentTopProduct?.sales || 0, previousTopProduct.sales)
    : "+∞%";

  return [
    {
      label: "New Users",
      value: currentUsers.toLocaleString(),
      change: getChange(currentUsers, previousUsers),
    },
    {
      label: "Revenue",
      value: `KES ${currentRevenue.toLocaleString()}`,
      change: getChange(currentRevenue, previousRevenue),
    },
    {
      label: "Refunds",
      value: `KES ${currentRefunds.toLocaleString()}`,
      change: getChange(currentRefunds, previousRefunds),
    },
    {
      label: "Orders",
      value: currentOrders.toLocaleString(),
      change: getChange(currentOrders, previousOrders),
    },
    {
      label: "Top Product",
      value: currentTopProduct?.name || "N/A",
      change: topProductChange,
    },
  ];
};

export default reportsData;
