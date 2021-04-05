export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
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

export type Group = {
  id: string;
  name: string | null;
  members: [User];
  icon: string;
  balance: Owe;
};
