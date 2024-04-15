const express = require("express");
const {
	register,
	login,
	getAllUsers,
	getSpecificUser,
	updateUser,
	deleteUser,
} = require("../UserController");

const userRouter = express.Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/getAllUsers").get(getAllUsers);
userRouter.route("/getSpecificUser/:id").get(getSpecificUser);
userRouter.route("/updateUser/:id").put(updateUser);
userRouter.route("/deleteUser/:id").delete(deleteUser);

module.exports = userRouter;
