import express from "express";
import {
  getUsers,
  getUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} from "../controllers/users.js";
import {
  validateAvatar,
  validateProfile,
  validateUserId,
} from "../middlewares/validation.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.get("/:userId", validateUserId, getUser);
router.patch("/me", validateProfile, updateProfile);
router.patch("/me/avatar", validateAvatar, updateAvatar);

export default router;
