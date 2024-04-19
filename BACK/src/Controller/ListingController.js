const { Listing } = require("../Model/Listing");
const client = require("../Services/DbConnexion");
const { ObjectId } = require("bson");
const jwt = require("jsonwebtoken");
const { extractToken } = require("../Utils/extractToken");
require("dotenv").config();

const createListing = async (req, res) => {
	if (
		!req.body.title ||
		!req.body.image ||
		!req.body.description ||
		!req.body.maxParticipants
	) {
		res.status(400).json({ error: "Some fields are missing" });
	}
	console.log(req.body.userId);
	const token = await extractToken(req);
	let userId;

	jwt.verify(token, process.env.SECRET_KEY, async (err, authData) => {
		if (err) {
			console.log(err);
			res.status(401).json({ err: "Unhautorized" });
			return;
		} else {
			userId = authData.id;
		}
	});

	try {
		let listing = new Listing(
			req.body.title,
			req.body.image,
			req.body.description,
			userId,
			new Date(),
			req.body.maxParticipants
		);
		let result = await client
			.db("Brief-4")
			.collection("listing")
			.insertOne(listing);
		res.status(200).json(result);
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
};

const getAllListings = async (req, res) => {
	let listings = await client.db("Brief-4").collection("listing").find();

	let apiResponse = await listings.toArray();
	res.status(200).json(apiResponse);
};

const getSpecificListing = async (req, res) => {
	try {
		const objectId = new ObjectId(req.params.id);
		let cursor = client
			.db("Brief-4")
			.collection("listing")
			.find({ _id: objectId });
		let result = await cursor.toArray();
		if (result.length > 0) {
			res.status(200).json(result);
			console.log(result);
		} else {
			res.status(204).json({ msg: "This listing does not exist" });
		}
	} catch (error) {
		console.log(error);
		res.status(501).json(error);
	}
};

const getMyListings = async (req, res) => {
	const token = await extractToken(req);

	jwt.verify(token, process.env.SECRET_KEY, async (err, authData) => {
		if (err) {
			console.log(err);
			res.status(401).json({ err: "Unhautorized" });
			return;
		} else {
			let listings = await client
				.db("Brief-4")
				.collection("listing")
				.find({ userId: authData.id });
			let apiResponse = await listings.toArray();
			console.log(authData);
			res.status(200).json(apiResponse);
			console.log(apiResponse);
		}
	});
};

const updateListing = async (req, res) => {
	try {
		let id = new ObjectId(req.params.id);
		let title = req.body.title;
		let image = req.body.image;
		let description = req.body.description;
		let maxParticipants = req.body.maxParticipants;
		let result = await client
			.db("Brief-4")
			.collection("listing")
			.updateOne(
				{ _id: id },
				{ $set: { title, image, description, maxParticipants } }
			);
		if (result.modifiedCount === 1) {
			res.status(200).json({ msg: "Listing modification successfull" });
		} else {
			res.status(404).json({ msg: "This listing does not exist" });
		}
	} catch (error) {
		console.log(error);
		res.status(501).json(error);
	}
};

const deleteListing = async (req, res) => {
	try {
		let id = new ObjectId(req.params.id);
		let result = await client
			.db("Brief-4")
			.collection("listing")
			.deleteOne({ _id: id });
		if (result.deletedCount === 1) {
			res.status(200).json({ msg: "Deleted listing successfull" });
		} else {
			res.status(404).json({ msg: "This listing does not exist" });
		}
	} catch (error) {
		console.log(error);
		res.status(501).json(error);
	}
};

module.exports = {
	createListing,
	getAllListings,
	updateListing,
	getSpecificListing,
	deleteListing,
	getMyListings,
};
