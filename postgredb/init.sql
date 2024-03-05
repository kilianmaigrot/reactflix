-- Log
ALTER SYSTEM SET log_statement = 'all';

-- Création de la DB
SELECT 'CREATE DATABASE logintp' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'logintp');

-- Connexion à la DB
\c logintp;

-- Création de la table users
CREATE TABLE IF NOT EXISTS users (
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    surname VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(150) NOT NULL,
    user_language VARCHAR(150) DEFAULT 'frFr',
    user_role VARCHAR(150) DEFAULT 'user'
);

-- Création de la table movies
CREATE TABLE IF NOT EXISTS movies (
    id_movie SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    year VARCHAR(150),
    director VARCHAR(150),
    genre VARCHAR(150),
    runtime VARCHAR(150),
    summary VARCHAR(500),
    poster_link VARCHAR(300),
    trailer_link VARCHAR(300)
);

-- Création du lien play_in
CREATE TABLE IF NOT EXISTS play_in (
   id_movie SERIAL,
   actor_name VARCHAR(150),
   actor_role VARCHAR(150),
   PRIMARY KEY(id_movie, actor_name),
   FOREIGN KEY(id_movie) REFERENCES movies(id_movie)
);

-- Insertion des films
INSERT INTO movies (title, year, director, genre, runtime, summary, poster_link, trailer_link) VALUES
    ('Film 1', 2020, 'Director 1', 'Action', 120, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.1', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 2', 2019, 'Director 2', 'Comedy', 110, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.2', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 3', 2018, 'Director 3', 'Drama', 130, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.3', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 4', 2017, 'Director 4', 'Thriller', 115, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 5', 2016, 'Director 5', 'Horror', 100, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.5', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 6', 2015, 'Director 6', 'Sci-Fi', 125, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.6', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 7', 2014, 'Director 7', 'Romance', 110, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.7', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 8', 2013, 'Director 8', 'Mystery', 135, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.8', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 9', 2012, 'Director 9', 'Fantasy', 120, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.9', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 10', 2011, 'Director 10', 'Action', 110, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.10', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 11', 2010, 'Director 11', 'Comedy', 100, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.11', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 12', 2009, 'Director 12', 'Drama', 130, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.12', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 13', 2008, 'Director 13', 'Thriller', 115, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.13', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 14', 2007, 'Director 14', 'Horror', 105, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.14', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 15', 2006, 'Director 15', 'Sci-Fi', 120, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.15', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 16', 2005, 'Director 16', 'Romance', 110, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.16', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 17', 2004, 'Director 17', 'Mystery', 140, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.17', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 18', 2003, 'Director 18', 'Fantasy', 125, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.18', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 19', 2002, 'Director 19', 'Action', 115, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.19', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 20', 2001, 'Director 20', 'Comedy', 105, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.20', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 21', 2000, 'Director 21', 'Drama', 135, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.21', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 22', 1999, 'Director 22', 'Thriller', 120, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.22', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 23', 1998, 'Director 23', 'Horror', 110, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.23', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 24', 1997, 'Director 24', 'Sci-Fi', 125, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.24', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 25', 1996, 'Director 25', 'Romance', 115, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.25', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 26', 1995, 'Director 26', 'Mystery', 145, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.26', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 27', 1994, 'Director 27', 'Fantasy', 130, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.27', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 28', 1993, 'Director 28', 'Action', 120, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.28', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 29', 1992, 'Director 29', 'Comedy', 110, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.29', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 30', 1991, 'Director 30', 'Drama', 140, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.30', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 31', 1990, 'Director 31', 'Thriller', 125, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.31', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 32', 1989, 'Director 32', 'Horror', 115, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.32', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 33', 1988, 'Director 33', 'Sci-Fi', 130, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.33', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 34', 1987, 'Director 34', 'Romance', 120, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.34', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 35', 1986, 'Director 35', 'Mystery', 150, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.35', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 36', 1985, 'Director 36', 'Fantasy', 135, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.36', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 37', 1984, 'Director 37', 'Action', 125, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.37', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 38', 1983, 'Director 38', 'Comedy', 115, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.38', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 39', 1982, 'Director 39', 'Drama', 145, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.39', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 40', 1981, 'Director 40', 'Thriller', 130, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.40', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 41', 1980, 'Director 41', 'Horror', 120, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.41', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 42', 1979, 'Director 42', 'Sci-Fi', 135, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.42', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 43', 1978, 'Director 43', 'Romance', 125, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.43', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 44', 1977, 'Director 44', 'Mystery', 155, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.44', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 45', 1976, 'Director 45', 'Fantasy', 140, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.45', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 46', 1975, 'Director 46', 'Action', 130, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.46', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 47', 1974, 'Director 47', 'Comedy', 120, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.47', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 48', 1973, 'Director 48', 'Drama', 150, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.48', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 49', 1972, 'Director 49', 'Thriller', 135, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.49', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0'),
    ('Film 50', 1971, 'Director 50', 'Horror', 125, 'Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée.50', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3qVUtLlU8y8cgH3r4g89kyzhi04TBN_Ty6VDTYeGS-eL5UZ0RQBZ9F25aWN8x40zJqI&usqp=CAU', 'https://www.youtube.com/watch?v=6n4087J7OW0');

-- Insertion des acteurs pour chaque film
INSERT INTO play_in (id_movie, actor_name, actor_role) VALUES
    (1, 'Actor 1', 'Role 1'),
    (1, 'Actor 2', 'Role 2'),
    (1, 'Actor 3', 'Role 3'),

    (2, 'Actor 4', 'Role 1'),
    (2, 'Actor 5', 'Role 2'),
    (2, 'Actor 6', 'Role 3'),

    (3, 'Actor 7', 'Role 1'),
    (3, 'Actor 8', 'Role 2'),
    (3, 'Actor 9', 'Role 3'),

    (4, 'Actor 10', 'Role 1'),
    (4, 'Actor 11', 'Role 2'),
    (4, 'Actor 12', 'Role 3'),

    (5, 'Actor 13', 'Role 1'),
    (5, 'Actor 14', 'Role 2'),
    (5, 'Actor 15', 'Role 3'),

    (6, 'Actor 16', 'Role 1'),
    (6, 'Actor 17', 'Role 2'),
    (6, 'Actor 18', 'Role 3'),

    (7, 'Actor 19', 'Role 1'),
    (7, 'Actor 20', 'Role 2'),
    (7, 'Actor 21', 'Role 3'),

    (8, 'Actor 22', 'Role 1'),
    (8, 'Actor 23', 'Role 2'),
    (8, 'Actor 24', 'Role 3'),

    (9, 'Actor 25', 'Role 1'),
    (9, 'Actor 26', 'Role 2'),
    (9, 'Actor 27', 'Role 3'),

    (10, 'Actor 28', 'Role 1'),
    (10, 'Actor 29', 'Role 2'),
    (10, 'Actor 30', 'Role 3'),

    (11, 'Actor 31', 'Role 1'),
    (11, 'Actor 32', 'Role 2'),
    (11, 'Actor 33', 'Role 3'),

    (12, 'Actor 34', 'Role 1'),
    (12, 'Actor 35', 'Role 2'),
    (12, 'Actor 36', 'Role 3'),

    (13, 'Actor 37', 'Role 1'),
    (13, 'Actor 38', 'Role 2'),
    (13, 'Actor 39', 'Role 3'),

    (14, 'Actor 40', 'Role 1'),
    (14, 'Actor 41', 'Role 2'),
    (14, 'Actor 42', 'Role 3'),

    (15, 'Actor 43', 'Role 1'),
    (15, 'Actor 44', 'Role 2'),
    (15, 'Actor 45', 'Role 3'),

    (16, 'Actor 46', 'Role 1'),
    (16, 'Actor 47', 'Role 2'),
    (16, 'Actor 48', 'Role 3'),

    (17, 'Actor 49', 'Role 1'),
    (17, 'Actor 50', 'Role 2'),
    (17, 'Actor 51', 'Role 3'),

    (18, 'Actor 52', 'Role 1'),
    (18, 'Actor 53', 'Role 2'),
    (18, 'Actor 54', 'Role 3'),

    (19, 'Actor 55', 'Role 1'),
    (19, 'Actor 56', 'Role 2'),
    (19, 'Actor 57', 'Role 3'),

    (20, 'Actor 58', 'Role 1'),
    (20, 'Actor 59', 'Role 2'),
    (20, 'Actor 60', 'Role 3'),

    (21, 'Actor 61', 'Role 1'),
    (21, 'Actor 62', 'Role 2'),
    (21, 'Actor 63', 'Role 3'),

    (22, 'Actor 64', 'Role 1'),
    (22, 'Actor 65', 'Role 2'),
    (22, 'Actor 66', 'Role 3'),

    (23, 'Actor 67', 'Role 1'),
    (23, 'Actor 68', 'Role 2'),
    (23, 'Actor 69', 'Role 3'),

    (24, 'Actor 70', 'Role 1'),
    (24, 'Actor 71', 'Role 2'),
    (24, 'Actor 72', 'Role 3'),

    (25, 'Actor 73', 'Role 1'),
    (25, 'Actor 74', 'Role 2'),
    (25, 'Actor 75', 'Role 3'),

    (26, 'Actor 76', 'Role 1'),
    (26, 'Actor 77', 'Role 2'),
    (26, 'Actor 78', 'Role 3'),

    (27, 'Actor 79', 'Role 1'),
    (27, 'Actor 80', 'Role 2'),
    (27, 'Actor 81', 'Role 3'),

    (28, 'Actor 82', 'Role 1'),
    (28, 'Actor 83', 'Role 2'),
    (28, 'Actor 84', 'Role 3'),

    (29, 'Actor 85', 'Role 1'),
    (29, 'Actor 86', 'Role 2'),
    (29, 'Actor 87', 'Role 3'),

    (30, 'Actor 88', 'Role 1'),
    (30, 'Actor 89', 'Role 2'),
    (30, 'Actor 90', 'Role 3'),

    (31, 'Actor 91', 'Role 1'),
    (31, 'Actor 92', 'Role 2'),
    (31, 'Actor 93', 'Role 3'),

    (32, 'Actor 94', 'Role 1'),
    (32, 'Actor 95', 'Role 2'),
    (32, 'Actor 96', 'Role 3'),

    (33, 'Actor 97', 'Role 1'),
    (33, 'Actor 98', 'Role 2'),
    (33, 'Actor 99', 'Role 3'),

    (34, 'Actor 100', 'Role 1'),
    (34, 'Actor 101', 'Role 2'),
    (34, 'Actor 102', 'Role 3'),

    (35, 'Actor 103', 'Role 1'),
    (35, 'Actor 104', 'Role 2'),
    (35, 'Actor 105', 'Role 3'),

    (36, 'Actor 106', 'Role 1'),
    (36, 'Actor 107', 'Role 2'),
    (36, 'Actor 108', 'Role 3'),

    (37, 'Actor 109', 'Role 1'),
    (37, 'Actor 110', 'Role 2'),
    (37, 'Actor 111', 'Role 3'),

    (38, 'Actor 112', 'Role 1'),
    (38, 'Actor 113', 'Role 2'),
    (38, 'Actor 114', 'Role 3'),

    (39, 'Actor 115', 'Role 1'),
    (39, 'Actor 116', 'Role 2'),
    (39, 'Actor 117', 'Role 3'),

    (40, 'Actor 118', 'Role 1'),
    (40, 'Actor 119', 'Role 2'),
    (40, 'Actor 120', 'Role 3'),

    (41, 'Actor 121', 'Role 1'),
    (41, 'Actor 122', 'Role 2'),
    (41, 'Actor 123', 'Role 3'),

    (42, 'Actor 124', 'Role 1'),
    (42, 'Actor 125', 'Role 2'),
    (42, 'Actor 126', 'Role 3'),

    (43, 'Actor 127', 'Role 1'),
    (43, 'Actor 128', 'Role 2'),
    (43, 'Actor 129', 'Role 3'),

    (44, 'Actor 130', 'Role 1'),
    (44, 'Actor 131', 'Role 2'),
    (44, 'Actor 132', 'Role 3'),

    (45, 'Actor 133', 'Role 1'),
    (45, 'Actor 134', 'Role 2'),
    (45, 'Actor 135', 'Role 3'),

    (46, 'Actor 136', 'Role 1'),
    (46, 'Actor 137', 'Role 2'),
    (46, 'Actor 138', 'Role 3'),

    (47, 'Actor 139', 'Role 1'),
    (47, 'Actor 140', 'Role 2'),
    (47, 'Actor 141', 'Role 3'),

    (48, 'Actor 142', 'Role 1'),
    (48, 'Actor 143', 'Role 2'),
    (48, 'Actor 144', 'Role 3'),

    (49, 'Actor 145', 'Role 1'),
    (49, 'Actor 146', 'Role 2'),
    (49, 'Actor 147', 'Role 3'),

    (50, 'Actor 148', 'Role 1'),
    (50, 'Actor 149', 'Role 2'),
    (50, 'Actor 150', 'Role 3');
