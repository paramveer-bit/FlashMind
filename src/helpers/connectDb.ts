export const userTable = `
CREATE TABLE IF NOT EXISTS users(
    uid SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW()
)`;

export const cardTable = `
CREATE TABLE IF NOT EXISTS cards(
    fid SERIAL PRIMARY KEY,
    question VARCHAR(400) NOT NULL,
    answer VARCHAR(2000) NOT NULL,
    tag VARCHAR(30) NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    owner INT NOT NULL,
    FOREIGN KEY (owner) REFERENCES users(uid)
)`;