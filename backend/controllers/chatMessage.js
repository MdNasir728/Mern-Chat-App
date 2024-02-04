const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");

const fetchChatMessage = async (req, res) => {
  const { chatId } = req.params;
  try {
    const response = await Message.find({ chatId }).sort({
      createdAt: 1,
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const createChatMessage = async (req, res) => {
  const { text } = req.body;
  const { chatId } = req.params;
  const sender = req.user._id;
  try {
    const response = await Message.create({ sender, text, chatId });
    if (response._id) {
      await Chat.findByIdAndUpdate(chatId, { lastMsg: text });
    }
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { fetchChatMessage, createChatMessage };
