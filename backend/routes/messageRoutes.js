const express = require("express");
const {
  fetchChatMessage,
  createChatMessage,
} = require("../controllers/chatMessage");
const verifyAuth = require("../middleware/verifyAuth");

const router = express.Router();

router.use(verifyAuth)
router.post("/:chatId", createChatMessage);
router.get("/:chatId", fetchChatMessage);

module.exports = router;
