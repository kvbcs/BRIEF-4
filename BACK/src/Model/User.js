//Création des classes utilisateurs
class User {
	constructor(id, firstName, lastName, email, password, gdpr, createdAt) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.gdpr = gdpr;
		this.createdAt = createdAt;
	}
}

//Exportation de la classe
module.exports = { User };
