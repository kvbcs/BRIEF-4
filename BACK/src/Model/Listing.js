//Création de la classe des annonces
class Listing {
	constructor(
		title,
		image,
		description,
		userId,
		createdAt,
		maxParticipants,
		nbParticipants
	) {
		this.title = title;
		this.image = image;
		this.description = description;
		this.userId = userId;
		this.createdAt = createdAt;
		this.maxParticipants = maxParticipants;
		this.nbParticipants = nbParticipants;
	}
}

//Exportation de la classe
module.exports = { Listing };
