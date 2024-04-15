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

module.exports = { Listing };
