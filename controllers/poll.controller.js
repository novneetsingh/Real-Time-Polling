import { prisma } from "../config/prisma.js";

// create a poll
export const createPoll = async (req, res) => {
  const { creatorId, question, options } = req.body;
  try {
    const poll = await prisma.poll.create({
      data: {
        creatorId,
        question,
        options: {
          create: options,
        },
      },
      include: {
        options: true,
      },
    });
    res.status(201).json({
      success: poll ? true : false,
      message: poll ? "Poll created successfully" : "Poll creation failed",
      data: poll ? poll : null,
    });
  } catch (error) {
    console.log("Error in createPoll: ", error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// get all polls
export const getAllPolls = async (req, res) => {
  try {
    const polls = await prisma.poll.findMany({
      include: {
        options: true,
      },
    });
    res.status(200).json({
      success: polls?.length ? true : false,
      message: polls?.length ? "Polls fetched successfully" : "No polls found",
      count: polls ? polls.length : 0,
      data: polls ? polls : null,
    });
  } catch (error) {
    console.log("Error in getAllPolls: ", error);
    res.status(400).json({ success: false, error: error.message });
  }
};
