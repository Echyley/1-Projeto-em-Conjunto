CREATE DATABASE joguinho;
USE joguinho;

CREATE TABLE users(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(25) NOT NULL,
	email VARCHAR(70) NOT NULL,
	password VARCHAR(50) NOT NULL,
	createAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password) VALUES 
	('Bob', 'bob@example.com', '123'),
	('Jeff', 'jeff@example.com', '456'),
	('Sara', 'sara@example.com', '789');
