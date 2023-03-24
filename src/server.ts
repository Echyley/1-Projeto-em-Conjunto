import express from 'express';
import { createUser, getUserByName } from './database.js';

const app = express();
const PORT = 4444;

// For parsing application/json
app.use(express.json());
 
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req: any, res: any) => {
	const { name, password } = req.body;
	const user = await getUserByName(name);
	if (!user || user.name !== name && user.password !== password) {
		res.send("Acess denied");
		return;
	} 
	res.send("Acess garated");
});

app.post('/register', async (req: any, res: any) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.send("Missing required parameters");
		return;
	}
	const user = await getUserByName(name);
	if (!user) {
		const result = await createUser(name, email, password);
		res.status(201).send('User registered');
		return;
	}
	console.log(user);
	if (user.name) {
		res.send('Name already registered');
		return;
	}
	if (user.email) {
		res.send('Email already registered');
		return;
	}
	return;
})

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
