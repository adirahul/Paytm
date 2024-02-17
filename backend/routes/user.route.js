const express = require("express")
const { createUser, loginUser, updateUser, getUsers } = require("../controllers/userController.js")
const {requireSignIn} = require("../middlewares/authMiddleware.js")
const router = express.Router()

router.put("/", requireSignIn, updateUser)
router.post("/signup", createUser)
router.post("/login", loginUser)
router.get("/bulk", requireSignIn, getUsers)


module.exports = router