-- Create a new database
SELECT 'CREATE DATABASE logintp' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'logintp');

-- Switch to the newly created database
\c logintp;

-- Create a new table
CREATE TABLE IF NOT EXISTS users (
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    surname VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(150) NOT NULL,
    user_language VARCHAR(150) DEFAULT 'frFr'
);
