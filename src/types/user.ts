export interface IUser {
    userId: string;
    name: string;
    email: string;
    isBlocked?: boolean;
    role: "landlord" | "admin" | "tenant";
    iat?: number;
    exp?: number;
  }