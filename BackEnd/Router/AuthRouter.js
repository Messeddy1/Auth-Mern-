const express = require("express");
const {
  register,
  logIn,
  logOut,
  getProfile,
  updateProfile,
} = require("../Controler/UserControler");
const protecteur = require("../Middlware/Protect");
const UserRouter = express.Router();
UserRouter.post("/register", register);
UserRouter.post("/login", logIn);
UserRouter.post("/logout", logOut);
UserRouter.get("/profile", protecteur, getProfile);
UserRouter.put("/profile", protecteur, updateProfile);

module.exports = UserRouter;
