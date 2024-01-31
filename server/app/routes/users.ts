import { Request, Response, NextFunction, Router } from 'express';
import database from '../config/db.config'
import bcrypt from 'bcryptjs';

const router: Router = Router()

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await database.connect();

    const result = await client.query('SELECT * FROM users');

    client.release();

    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await database.connect();

    const email = req.body.email;

    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);

    client.release();

    if (result.rows.length > 0) {
      res.status(401).json({ error: "Un utilisateur existe déjà avec cette adresse email" });
    } else {
      try {
        let salt = await bcrypt.genSalt(10);
        const client = await database.connect();

        const name = req.body.name;
        const surname = req.body.surname;
        const password = await bcrypt.hash(req.body.password, salt);

        const insertResult = await client.query('INSERT INTO users (name, surname, password, email) VALUES ($1, $2, $3, $4)', [name, surname, password, email]);

        console.log(insertResult);

        client.release();

        res.status(200).json({ message: "Utilisateur créé avec succès" });
      } catch (err) {
        next(err);
      }
    }
  } catch (err) {
    next(err);
  }
});

router.patch("/updateLanguage", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await database.connect();

    const idUser = req.body.idUser;
    const userLanguage = req.body.userLanguage;

    const insertResult = await client.query('UPDATE users SET user_language = $1 WHERE id_user = $2', [userLanguage, idUser]);

    console.log(insertResult);

    client.release();

    res.status(200).json({ message: "Langue de l'utilisateur mis a jour avec succès" });
  } catch (err) {
    next(err);
  }
});

router.patch("/updateUser", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await database.connect();
    console.log(req.body);

    const idUser = req.body.idUser;
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    
    const insertResult = await client.query('UPDATE users SET name = $1, surname = $2, email = $3 WHERE id_user = $4', [name, surname, email, idUser]);

    client.release();

    res.status(200).json({ message: "Utilisateur mis a jour avec succès" });
  } catch (err) {
    next(err);
  }
});

router.patch("/updatePassword", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let salt = await bcrypt.genSalt(10);
    const client = await database.connect();
    
    const idUser = req.body.idUser;
    const password = await bcrypt.hash(req.body.newPassword, salt);
    
    const insertResult = await client.query('UPDATE users SET password = $1 WHERE id_user = $2', [password, idUser]);
    
    client.release();
    
    res.status(200).json({ message: "Mot de passe changé avec succès" });
  } catch (err) {
    next(err);
  }
});

export default router;