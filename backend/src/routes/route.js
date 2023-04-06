const express = require("express")
const router=express.Router()

const currrencyHandler = require("../controllers/currencyController")

router.get("/currency-exchange",currrencyHandler.currrencyExchange)
router.get("/convert",currrencyHandler.convertAmount)

module.exports = router