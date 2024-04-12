const { MongoClient, Db } = require("mongodb");

//Initialisation de client à null pour ne pas l'utiliser hors fonction
var client = null;

//Création d'une fonction connect prenant un url et callback en paramètres
function connect(url, callback) {
	//On vérifie que le client est bien null
	if (client === null) {
		//Dans ce cas on créé une nouvelle instance de MongoClient avec l'url fournie
		client = new MongoClient(url);
		//Connexion au serveur MongoDB
		client.connect((error) => {
			//Vérification d'erreur lors de la connexion
			if (error) {
				//On réinitialise le client à null en cas d'erreur
				client = null;
				//Appel du callback avec l'erreur
				callback(error);
			} else {
				//Appel du callback sans erreur
				callback();
			}
		});
	} else {
		//Si client pas null, appel du callback sans effectuer la connexion
		callback();
	}
}

//On fait une fonction db qui retourne une nouvelle instance de Db en utilisant le client existant
function db(dbName) {
	return new Db(client, dbName);
}

//On fait une fonction closeConnect pour fermer la connexion avec MongoDB
function closeConnect() {
	//On vérifie que le client existe
	if (client) {
		//S'il existe, on ferme la connexion avec MongoDB
		client.close();
		//Et on réinitialise le client à null
		client = null;
	}
}

//Exportation des fonctions
module.exports = { connect, db, closeConnect };
