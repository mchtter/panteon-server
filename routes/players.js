import express from 'express';
import { createFakeData, getPlayers } from "../controllers/players.js"
  
const router = express.Router();

router.get("/", getPlayers)
router.get("/create", createFakeData) // Create 1000 User

export default router