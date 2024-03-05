import { Request, Response, NextFunction, Router } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ ping: 'pong' });
});

export default router;
