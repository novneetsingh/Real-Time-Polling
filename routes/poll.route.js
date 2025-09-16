import { Router } from "express";
import { createPoll, getAllPolls } from "../controllers/poll.controller.js";

const pollRouter = Router();

pollRouter.route("/").get(getAllPolls).post(createPoll);

export default pollRouter;
