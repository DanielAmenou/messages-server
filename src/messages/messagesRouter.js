const express = require("express");
const router = express.Router();
const MessagesService = require("./messagesService");
const { InvalidAPIError } = require("../exceptions");

router.get("/:userId", async (req, res, next) => {
  MessagesService.getMessagesOf(req.params.userId)
    .then((result) => {
      res.statusCode = 200;
      res.json(result);
      return 1;
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  MessagesService.saveMessage(req.body)
    .then((result) => {
      res.statusCode = 201;
      return res.json(result);
    })
    .catch(next);
});

router.delete("/:messageId", (req, res, next) => {
  MessagesService.delete(req.params.messageId)
    .then((result) => {
      res.statusCode = 200;
      return res.json(result);
    })
    .catch(next);
});

router.all("*", (req, res, next) => {
  next(new InvalidAPIError("", __filename, "messages"));
});

module.exports = router;
