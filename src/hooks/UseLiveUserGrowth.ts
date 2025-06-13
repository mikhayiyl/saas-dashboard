import { useLiveData } from "./useLiveData";

// Display type
export type UserGrowthItem = {
  date: string;
  users: number;
};

// Raw Firebase structure type
type RawAnalytics = {
  userGrowth: {
    [date: string]: {
      newUsers: number;
    };
  };
};

// Transform logic for daily
const transform = (val: RawAnalytics): UserGrowthItem[] => {
  return Object.entries(val?.userGrowth || {}).map(([date, entry]) => ({
    date,
    users: entry?.newUsers ?? 0,
  }));
};

const UseLiveUserGrowth = () => {
  const { data, isUpdating, error, retry } = useLiveData<
    UserGrowthItem,
    RawAnalytics
  >("analytics", transform);
  return { data, isUpdating, error, retry };
};

export default UseLiveUserGrowth;
