import express from "express";
import {
  inreasePlayerDiff,
  decreasePlayerDiff,
} from "../controllers/update.js";

const router = express.Router();

router.post("/increase", inreasePlayerDiff);
router.post("/decrease", decreasePlayerDiff);

export default router;
