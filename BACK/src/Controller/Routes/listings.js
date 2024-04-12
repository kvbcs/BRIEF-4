const express = require("express");
const { createListing, getAllListings } = require("../ListingController");

const router = express.Router();

router.route("/create").post(createListing);
router.route("/all").get(getAllListings);

module.exports = router;
