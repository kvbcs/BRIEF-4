class Listing {
	constructor(title, image, description, userId, createdAt, maxParticipants) {
		this.title = title;
		this.image = image;
		this.description = description;
		this.userId = userId;
		this.createdAt = createdAt;
		this.maxParticipants = maxParticipants;
	}
}

module.exports = { Listing };
