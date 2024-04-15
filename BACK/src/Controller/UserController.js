const { User } = require("../Model/User");
const client = require("../Services/DbConnexion");
const bcrypt = require("bcrypt");
const { ObjectId } = require("bson");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
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

		res.status(200).json(result);
		console.log(result);
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
};

const login = async (req, res) => {
	if (!req.body.email || !req.body.password) {
		res.status(400).json({ error: "Some login fields are missing" });
		return;
	} else {
		res.status(200).json("Login verified");
	}
	let user = await client
		.db("Brief-4")
		.collection("user")
		.findOne({ email: req.body.email });
	console.log(user);
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
