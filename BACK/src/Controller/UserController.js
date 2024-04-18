const { User } = require("../Model/User");
const client = require("../Services/DbConnexion");
const bcrypt = require("bcrypt");
const { ObjectId } = require("bson");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
	const existingUser = await client
		.db("Brief-4")
		.collection("user")
		.findOne({ email: req.body.email });

	if (existingUser) {
		return res.status(400).json({ msg: "This email is already used" });
	}
	if (
		!req.body.firstName ||
		!req.body.lastName ||
		!req.body.email ||
		!req.body.password
	) {
		res.status(400).json({ error: "Some fields are missing" });
	}
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		let user = new User(
			null,
			req.body.firstName,
			req.body.lastName,
			req.body.email,
			hashedPassword,
			new Date(),
			new Date()
		);
		let result = await client
			.db("Brief-4")
			.collection("user")
			.insertOne(user);

		const token = jwt.sign(
			{
				id: result.insertedId,
				email: user.email,
			},
			process.env.SECRET_KEY,

			{ expiresIn: "24h" }
		);
		res.status(200).json({ token });
		console.log(token);
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
};

const login = async (req, res) => {
	if (!req.body.email || !req.body.password) {
		res.status(400).json({ error: "Some login fields are missing" });
		return;
	}

	let user = await client
		.db("Brief-4")
		.collection("user")
		.findOne({ email: req.body.email });
	console.log(user);

	if (!user) {
		res.status(401).json({ error: "Invalid email" });
		return;
	} else {
		const isValidPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		console.log(isValidPassword);

		if (!isValidPassword) {
			res.status(401).json({ error: "Invalid password" });
			return;
		} else {
			const token = jwt.sign(
				{
					id: user._id,
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					gdpr: new Date(user.gdpr).toLocaleString("fr"),
				},
				process.env.SECRET_KEY,

				{ expiresIn: "24h" }
			);
			console.log(process.env.SECRET_KEY);
			res.status(200).json({ jwt: token });
		}
	}
};

const getAllUsers = async (req, res) => {
	try {
		let apiRequest = client.db("Brief-4").collection("user").find();
		let users = await apiRequest.toArray();
		if (users && users.length > 0) {
			res.status(200).json(users);
			console.log(users);
		} else {
			res.status(204).json({ msg: "No content" });
		}
	} catch (error) {
		res.status(500).json({ error });
	}
};

const getSpecificUser = async (req, res) => {
	try {
		const objectId = new ObjectId(req.params.id);
		let cursor = client
			.db("Brief-4")
			.collection("user")
			.find({ _id: objectId });
		let result = await cursor.toArray();
		if (result.length > 0) {
			res.status(200).json(result);
			console.log(result);
		} else {
			res.status(204).json({ msg: "This user does not exist" });
		}
	} catch (error) {
		console.log(error);
		res.status(501).json(error);
	}
};

const updateUser = async (req, res) => {
	try {
		let id = new ObjectId(req.params.id);
		let firstName = req.body.firstName;
		let lastName = req.body.lastName;
		let email = req.body.email;
		let password = req.body.password;
		let result = await client
			.db("Brief-4")
			.collection("user")
			.updateOne(
				{ _id: id },
				{ $set: { firstName, lastName, email, password } }
			);
		if (result.modifiedCount === 1) {
			res.status(200).json({ msg: "Modification successfull" });
		} else {
			res.status(404).json({ msg: "This user does not exist" });
		}
	} catch (error) {
		console.log(error);
		res.status(501).json(error);
	}
};

const deleteUser = async (req, res) => {
	try {
		let id = new ObjectId(req.params.id);
		let result = await client
			.db("Brief-4")
			.collection("user")
			.deleteOne({ _id: id });
		if (result.deletedCount === 1) {
			res.status(200).json({ msg: "Deleted user successfull" });
		} else {
			res.status(404).json({ msg: "This user does not exist" });
		}
	} catch (error) {
		console.log(error);
		res.status(501).json(error);
	}
};

module.exports = {
	register,
	login,
	getAllUsers,
	getSpecificUser,
	updateUser,
	deleteUser,
};
