import { Router } from "express";
import { createVote } from "../controllers/vote.controller.js";

const voteRouter = Router();

voteRouter.post("/", createVote);

export default voteRouter;
