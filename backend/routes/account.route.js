const express = require("express")
const { requireSignIn } = require("../middlewares/authMiddleware")
const { getBalance, transferMoney } = require("../controllers/accountController")
const router = express.Router()

router.get("/balance", requireSignIn, getBalance)

router.post("/transfer", requireSignIn, transferMoney)

module.exports = router