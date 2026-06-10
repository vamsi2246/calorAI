// ====================================================
// Express Central Error Handling Middleware
// ====================================================

import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Exception";

  console.error(`[Error Boundary] Status ${statusCode} - ${message}`, err.stack);

  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
      timestamp: new Date().toISOString()
    }
  });
};
export default errorHandler;
