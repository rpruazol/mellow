DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS boards;

CREATE TABLE IF NOT EXISTS notes (
id serial PRIMARY KEY,
title VARCHAR (255),
description VARCHAR (255),
user_id VARCHAR (255),
board VARCHAR (255),
board_id VARCHAR(255),
created_at TIMESTAMP,
updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS boards (
id serial PRIMARY KEY,
name VARCHAR (255),
board_order serial,
user_id VARCHAR (255),
created_at TIMESTAMP
);
