const express = require("express");
const app = express();
const cors = require("cors");
const { connect } = require("./Services/DbConnexion");
const userRouter = require("./Controller/Routes/users");
const listingRouter = require("./Controller/Routes/listings");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

connect("mongodb://127.0.0.1:27017/", (error) => {
	if (error) {
		console.log("Failed to connect");
		process.exit(-1);
	} else {
		console.log("Successfully connected !");
	}
});

app.use("/", userRouter);
app.use("/", listingRouter);

app.listen(5000);
console.log("Server is running");
