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
  photo: string;
};

export type Owe = {
  id: string;
  value: number;
  to: User | null;
  createdAt: number;
};

export type Transaction = {
  id: string;
  title: string;
  description: string;
  amount: number;
  creator: User;
  createdAt: number;
  attachment: string;
};

export type Group = {
  id: string;
  name: string | null;
  members: User[];
  icon: string;
  balance: Owe;
};
