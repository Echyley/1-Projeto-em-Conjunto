import mysql from 'mysql2';

import dotnv from 'dotenv';
import { User } from './user';
dotnv.config();

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
}).promise();

export async function getUsers() {
	const [users] = await pool.query('SELECT * FROM users');
	return users;
}

export async function getUserByName(name: string) {
	const [user] = await pool.query(
		`SELECT * FROM users WHERE name = ?`, [name]
	);
	return user[0];
}

// return true as sucess or false if something went wrong, and the result
export async function createUser(name: string, email: string, password: string){
	await pool.query(
		`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, password],
		function(err: Error, result: any) {
			if (err) {
				console.log(err);
				return [false, [result]];
			};
			return [true, [result]];
		}
	); 
}
