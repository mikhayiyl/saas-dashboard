import { useLiveData } from "./useLiveData";

type ActiveUsersItem = {
  date: string;
  count: number;
};

const transformActiveUsers = (val: Record<string, any>): ActiveUsersItem[] => {
  const users = Object.values(val || {});

  const today = new Date();
  const daysBack = 7;

  const result: ActiveUsersItem[] = [];

  for (let i = 0; i < daysBack; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const iso = date.toISOString().split("T")[0];

    const count = users.filter((user: any) => {
      const userDate = new Date(user.lastSeen || 0);
      return (
        userDate.toISOString().split("T")[0] === iso &&
        today.getTime() - userDate.getTime() <= 10 * 60 * 1000 // active if seen in last 10 min
      );
    }).length;

    result.push({ date: iso, count });
  }

  return result.reverse();
};

const UseActiverUsers = () => {
  const { data, isUpdating, error, retry } = useLiveData<
    ActiveUsersItem,
    Record<string, any>
  >("users", transformActiveUsers);

  return { data, isUpdating, error, retry };
};

export default UseActiverUsers;
