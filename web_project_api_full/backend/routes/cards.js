import express from "express";
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from "../controllers/cards.js";
import { validateCard, validateCardId } from "../middlewares/validation.js";

const router = express.Router();

router.get("/", getCards);
router.post("/", validateCard, createCard);
router.delete("/:cardId", validateCardId, deleteCard);
router.put("/:cardId/likes", validateCardId, likeCard);
router.delete("/:cardId/likes", validateCardId, dislikeCard);

export default router;
