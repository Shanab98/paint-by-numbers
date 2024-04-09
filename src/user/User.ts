export type UserData = {
  readonly username: string;
  readonly password: string;
  readonly isActive: boolean;
};

export type User = {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
} & UserData;
