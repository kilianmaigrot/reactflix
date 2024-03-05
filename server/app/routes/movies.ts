import { Request, Response, NextFunction, Router } from 'express';
import database from '../config/db.config'

const router: Router = Router()

const capitalize = (string: string) => string = string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

router.post("/createMovie", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await database.connect();
    
    const resultExist = await client.query('SELECT id_movie FROM movies WHERE title ILIKE $1;', [`%${req.body.title}%`]);
    
    if (resultExist.rows.length > 0) {
      client.release();
      res.status(409).json({ message: "Movie already exist." });
    } else {
      const movieInsertResult = await client.query(
        'INSERT INTO movies (title, year, director, genre, runtime, summary, poster_link, trailer_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_movie;', 
        [
          capitalize(req.body.title), 
          req.body.year, 
          capitalize(req.body.director), 
          capitalize(req.body.genre), 
          req.body.runtime, 
          req.body.summary, 
          req.body.posterLink, 
          req.body.trailerLink
        ]
      );
      const movieID = movieInsertResult.rows[0].id_movie;      
      req.body.actors.map(async (actor) => {
        await client.query('INSERT INTO play_in (id_movie, actor_name, actor_role) VALUES ($1, $2, $3);', [movieID, capitalize(actor.actorName), capitalize(actor.actorRole)]);
      })
      
      res.status(201).json({ message: "Movie creation success." });
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/getAllMoviesCount", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await database.connect();
    const result = await client.query(
      `SELECT COUNT(id_movie) FROM movies 
      WHERE ${req.body.searchParam} ILIKE '%${req.body.searchText}%'`
    );  
    client.release();
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post("/getSomeMovies", async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const client = await database.connect();
    const result = await client.query(
      `SELECT * FROM movies 
      WHERE ${req.body.searchParam} ILIKE '%${req.body.searchText}%'
      ORDER BY ${req.body.sortParam} ${req.body.sortOrder} 
      LIMIT ${parseInt(req.body.limit)} OFFSET ${parseInt(req.body.offset)};`
    );  
    const movies = result.rows;
    const actorPromises = [];
    for (const movie of movies) {
        const actorQuery = client.query(`SELECT * FROM play_in WHERE id_movie = ${movie.id_movie}`);
        actorPromises.push(actorQuery);
    }
    const actorResults = await Promise.all(actorPromises);
    actorResults.forEach((actorResult, index) => {
        movies[index].actors = actorResult.rows;
    });
    client.release();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post("/deleteMovieById", async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const client = await database.connect();
    console.log(req.body);
    await client.query(
      `DELETE FROM play_in WHERE id_movie = ${req.body.idMovie};
      DELETE FROM movies WHERE id_movie = ${req.body.idMovie};`
    );  
    client.release();
    res.status(200).json({ message: 'Film supprimé avec succès' });;
  } catch (err) {
    console.log(err);    
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression du film' });;
  }

});

export default router;
