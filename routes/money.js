import express from "express";
import {
  inreasePlayerMoney,
  decreasePlayerMoney,
} from "../controllers/money.js";

const router = express.Router();

router.post("/increase", inreasePlayerMoney);
router.post("/decrease", decreasePlayerMoney);

export default router;
