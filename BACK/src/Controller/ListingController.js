const { Listing } = require("../Model/Listing");
const client = require("../Services/DbConnexion");
const { ObjectId } = require("bson");
//TODO : instancier extractToken d'Utils
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createListing = async (req, res) => {
	if (
		!req.body.title ||
		!req.body.image ||
		!req.body.description ||
		!req.body.userId ||
		!req.body.maxParticipants
	) {
		res.status(400).json({ error: "Some fields are missing" });
	}

	try {
		let listing = new Listing(
			req.body.title,
			req.body.image,
			req.body.description,
			req.body.userId,
			req.body.nbParticipants,
			req.body.maxParticipants,
			new Date()
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

module.exports = { createListing, getAllListings };
