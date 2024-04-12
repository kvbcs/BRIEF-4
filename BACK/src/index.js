const express = require("express");
const app = express();
const cors = require("cors");
const { connect } = require("./Services/DbConnexion");
const registerRoute = require("./Controller/Routes/users");
const { createListing } = require("./Controller/ListingController");
const { login } = require("./Controller/UserController");
//TODO : instancier le listingroutes
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", registerRoute);
app.use("/", createListing);
app.use("/", login);

//Appel de la fonction connect avec l'url de la base de données MongoDB et une fonction de callback
//qui a été fait dans Services
connect("mongodb://127.0.0.1:27017/", (error) => {
	//On vérifie s'il y a une erreur lors de la connexion
	if (error) {
		//On affiche une message d'erreur en cas d'échec de connexion
		console.log("Failed to connect");
		//Arrêt du processus avec un code d'erreur (-1)
		process.exit(-1);
	} else {
		//On affiche un message de succès en cas de connexion réussie
		console.log("Successfully connected !");
	}
});

//Démarrage de l'application sur le port 3000
app.listen(5000);
console.log("Server is running");
