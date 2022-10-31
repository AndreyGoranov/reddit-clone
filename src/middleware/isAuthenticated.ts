import { Request } from "express";
export const isAuthenticated = (req: Request) => {
  if (req.session.userId) {
    console.log('asd')
    return true;
  }
  console.log('before throwing err')
  throw new Error("Not Authenticated!");
};
