const express = require("express");
const { userChat, fetchUserChat } = require("../controllers/userChat");
const verifyAuth = require("../middleware/verifyAuth");

const router = express.Router();

router.use(verifyAuth);

router.post("/", userChat);
router.get("/", fetchUserChat);

module.exports = router;
