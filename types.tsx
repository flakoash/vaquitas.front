export type RootStackParamList = {
  Root: undefined;
  Group: undefined;
  NotFound: undefined;
  MainTab: undefined;
};

export type BottomTabParamList = {
  MainTab: undefined;
  TabTwo: undefined;
};

export type MainTabParamList = {
  MainTabScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type User = {
  id: string;
  name: string;
  photo: string | null;
};

export type Transaction = {
  id: string;
  title: string;
  description: string;
  amount: number;
  owner: User;
  createdAt: number;
};

export type Group = {
  id: string;
  name: string | null;
  members: User[];
  icon: string;
  balance: number;
  lastTransaction: number;
};
