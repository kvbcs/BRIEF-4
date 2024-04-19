const express = require("express");
const {
	createListing,
	getAllListings,
	updateListing,
	getSpecificListing,
	deleteListing,
	getMyListings,
} = require("../ListingController");
const { verifyToken } = require("../../Utils/extractToken");

const listingRouter = express.Router();

listingRouter.route("/createListing").post(createListing);
listingRouter.route("/getAllListings").get(getAllListings);
listingRouter.route("/getSpecificListing/:id").get(getSpecificListing);
listingRouter.route("/updateListing/:id").patch(updateListing);
listingRouter.route("/deleteListing/:id").delete(deleteListing);
listingRouter.route("/getMyListings", verifyToken).post(getMyListings);

module.exports = listingRouter;
