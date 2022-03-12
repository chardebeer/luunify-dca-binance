import { NextFunction, Request, Response } from 'express';
import { getToken } from 'next-auth/jwt';

function isApiRoute(path: string) {
  return path.startsWith('/api/') && !path.startsWith('/api/auth/');
}

export default async function authenticateRequest(req: Request, res: Response, next: NextFunction) {
  const token = await getToken({ req });

  if (!token && isApiRoute(req.path)) {
    res.status(403).json({ message: 'You are not authorized to perform this action' });
  } else {
    next();
  }
}
