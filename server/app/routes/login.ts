import { Request, Response, NextFunction, Router } from 'express';
import database from '../config/db.config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router: Router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await database.connect();

    const email = req.body.email;
    const password = req.body.password;

    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    client.release();
    const passwordOk = await bcrypt.compare(password, result.rows[0].password)
    if (result.rows.length && passwordOk) {
      const user = result.rows[0];
      const token = jwt.sign(user, process.env.JWT_SECRET || '123456789', { expiresIn: '1h' });
      res.status(200).json({ token, userInfos : result.rows[0] });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }

  } catch (err) {
    next(err);
  }
});

router.get("/verifyToken", async (req: Request, res: Response, next: NextFunction) => { // Private route (HOC, côté front)
  try {
    const authorizationHeader = req.header('Authorization');

    if (!authorizationHeader || !authorizationHeader.includes(' ')) {  // Vérifier include bearer
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authorizationHeader.split(' ')[1];

    const user = await verifyToken(token);

    if (user) {
      res.json({ user });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (err) {
    next(err);
  }
});

// Middleware de vérif token
const verifyToken = async (token: string): Promise<any | null> => {
  return new Promise((resolve) => {
    jwt.verify(token, process.env.JWT_SECRET || '123456789', (err, user) => {
      if (err) {
        resolve(null);
      } else {
        resolve(user);
      }
    });
  });
};

export default router;
