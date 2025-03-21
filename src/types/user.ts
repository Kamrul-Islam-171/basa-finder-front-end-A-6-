export interface IUser {
  userId: string;
  name: string;
  email: string;
  isBlocked?: boolean;
  role: "landlord" | "admin" | "tenant";
  iat?: number;
  exp?: number;
}

export interface IAllUser {
  createdAt: string;

  email: string;

  isBlocked: boolean;

  name: string;

  role: string;

  updatedAt: string;

  _id: string;
}
