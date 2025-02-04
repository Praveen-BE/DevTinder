const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");
const users = require("../models/user");
const bcrypt = require("bcrypt");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(401).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    // res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    // res.header("Access-Control-Allow-Methods", "GET, POST");
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request...");
    }

    const loggedInUser = req.user;
    // console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    // console.log(loggedInUser);

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, Your Profile Update Successfully !`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/password", async (req, res) => {
  try {
    const { emailId, newPassword, confirmPassword } = req.body;
    if (newPassword == confirmPassword) {
      const hashPassword = await bcrypt.hash(newPassword, 10);
      const forgotPassword = await users.findOneAndUpdate(
        { emailId: emailId },
        { password: hashPassword },
        { new: true }
      );

      if (!forgotPassword) throw new Error("Invalid Credintial...");

      res.send("Your Password is Updated" + forgotPassword);
    } else {
      throw new Error("newPassword and confirmPassword Should Be same...");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
