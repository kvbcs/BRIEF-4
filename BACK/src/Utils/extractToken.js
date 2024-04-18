async function extractToken(req) {
	//on récupère l'autorisation se trouvant dans header de requete
	const headerWithToken = req.headers.authorization;
	//si la requete est pas undefined
	if (typeof headerWithToken !== undefined || headerWithToken) {
		//on split la chaine de caractere en 2, la séparation se fait a chaque espace
		//tous les mots séparés d'un espace seront des index du tableau
		const bearer = headerWithToken.split(" ");
		//index [0] sera bearer (pas utilisé), index[1] sera le jwt
		const token = bearer[1];
		//on retourne le jwt au controller qui appelle cette fonction
	}
}

module.exports = { extractToken };
