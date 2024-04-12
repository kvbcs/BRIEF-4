const { User } = require("../Model/User");
const client = require("../Services/DbConnexion");
const bcrypt = require("bcrypt");
const { ObjectId } = require("bson");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//On créé une fonction asynchrone register avec req res en paramètres
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
		//Création d'un nouvel utilisateur grace au model de classe
		let user = new User(
			//On reprend chaque this.truc du Model, là l'id qui sera null car généré automatiquement
			null,
			//On request le prénom, nom, email et mot de passe
			req.body.firstName,
			req.body.lastName,
			req.body.email,
			req.body.password,
			new Date(), //Date du gdpr (date du jour)
			new Date() //Date de création (date du jour)
		);
		//On insert l'utilisateur dans la base de données MongoDb
		let result = await client
			.db("Brief-4") //Sélection de la base de données
			.collection("user") //Sélection de la collection user
			.insertOne(user); //Insertion d'un utilisateur
		//On envoie une réponse et le résultat de 'linsertion en json
		res.status(200).json(result);
		console.log(result);
	} catch (e) {
		//On affiche un message d'erreur dans console et on envoie une réponse
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

//Exportation de la fonction
module.exports = { register, login };
