import express, { Request, Response, NextFunction, Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

const router: Router = Router();

// Configuration CORS, n'accepte que les requêtes du localhost:3000
const corsOptions: cors.CorsOptions = {
  origin: 'http://localhost:3000',
};
router.use(cors(corsOptions));
app.use(cors(corsOptions));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
  } else {
    next();
  }
});

app.use(router);

// Parsing des requêtes entrantes en json et URL-encoded
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: "Bienvenue sur notre API en Node JS !" });
});

// Routing
import ping from './app/routes/ping';
router.use('/ping', ping);

import login from './app/routes/login';
router.use('/login', login);

import users from './app/routes/users';
router.use('/users', users);

// Gestion des erreurs
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Ecoute des requêtes
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`L'API est en ligne sur le port ${PORT}!`);
});
