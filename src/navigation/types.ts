import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Rewards: undefined;
};

export type RewardsScreenProps = StackScreenProps<RootStackParamList, "Rewards">;
export type HomeScreenProps = StackScreenProps<RootStackParamList, "Home">;