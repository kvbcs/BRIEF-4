const express = require("express");
const {
	createListing,
	getAllListings,
	updateListing,
	getSpecificListing,
	deleteListing,
} = require("../ListingController");

const listingRouter = express.Router();

listingRouter.route("/createListing").post(createListing);
listingRouter.route("/getAllListings").get(getAllListings);
listingRouter.route("/getSpecificListing/:id").get(getSpecificListing);
listingRouter.route("/updateListing/:id").put(updateListing);
listingRouter.route("/deleteListing/:id").delete(deleteListing);

module.exports = listingRouter;
