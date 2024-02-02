import { Request, Response, NextFunction, Router } from 'express';
import database from '../config/db.config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PoolClient } from 'pg';

const router: Router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client: PoolClient = await database.connect();
    
    const email = req.body.email;    
    const password = req.body.password;

    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    
    client.release();
    const passwordCrypted = result.rows && result.rows.length > 0 ? result.rows[0].password || '' : '';
    const passwordOk = await bcrypt.compare(password, passwordCrypted)    
    
    if (result.rows.length && passwordOk) {
      const user = result.rows[0];
      const token = jwt.sign(user, process.env.JWT_SECRET || '123456789', { expiresIn: '1h' });
      res.status(200).json({ token, user : result.rows[0] });
    } else {
      res.status(401).json({ message:'User login failure.' });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/verifyToken", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header('Authorization') || '';
    console.log(authorizationHeader);
    
    if (!authorizationHeader.includes('Bearer ')) {
      res.status(401).json({ message: 'Bearer not included' });
      return;
    }
    const token = authorizationHeader.split(' ')[1];
    const tokenConfirmed = await jwt.verify(token, process.env.JWT_SECRET || '123456789');
    if (tokenConfirmed) {
      res.status(200).json({ message: "Token verification success." });
    } else {
      res.status(401).json({ message: "Token verification failure." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
