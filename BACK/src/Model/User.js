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

module.exports = { User };
