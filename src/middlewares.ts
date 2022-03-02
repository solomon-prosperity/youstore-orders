import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// interface Req extends Request {
//   id: string | jwt.JwtPayload;
// }

export const verifyCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.header("auth-token");
  if (!token) res.status(401).json({ message: "invalid token" });
  else {
    const secret = process.env.CUSTOMER_JWT_SECRET;

    try {
      // verify token and save customer Id to the verified variable
      const payload = jwt.verify(token, `${secret}`);
      next();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      }
      throw error;
    }
  }
};