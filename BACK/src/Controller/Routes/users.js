const express = require("express");
const { register, login } = require("../UserController");

//Création d'un routeur Express
const router = express.Router();

//On créé une route pour l'inscription des utilisateurs, en écoutant les requêtes POST sur register
router.route("/register").post(register);
router.route("/login").post(login);

//Exportation de router
module.exports = router;
