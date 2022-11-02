import { Request } from "express";
export const isAuthenticated = (req: Request) => {
  if (req.session.userId) {
    return true;
  }
  throw new Error("Not Authenticated!");
};