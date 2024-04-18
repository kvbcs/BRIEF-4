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

const getMyListing = async (req, res) => {
	//on créé une const token qui extrait le token de headers/authrization, le token dans le header du http
	const token = await extractToken(req);
	//la librairie jwt propose une fonction verify, qui vérifie le token grace à la clé secrète et renvoi la donnée du jwt
	//si clé secrète est même qu'a la connexion (aka la clé passée dans jwt.sign) alors la donnée est renvoyée, sinon erreur

	jwt.verify(token, process.env.SECRET_KEY, async (err, authData) => {
		if (err) {
			console.log(err);
			res.status(401).json({ err: "Unhautorized" });
			return;
		} else {
			// Dans le callback de cette fonction est renvoyé la donnée présente dans le jwt
			// je me sers de cette donnée pour faire ma requête à mongodb
			// et je n'ai plus besoin de rien dans le body
			let listings = await client
				.db("Brief-4")
				.collection("listing")
				//authdata est ce qui la donnée renvoyé par verify
				//quand on fait jwt.sign à la connexion, on a mis l'id dans ce jwt
				//et donc je peux y accéder ici
				.find({ userId: authData.id });
			let apiResponse = await listings.toArray();
			res.status(200).json(apiResponse);
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
};
