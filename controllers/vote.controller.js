import { prisma } from "../config/prisma.js";

// create a vote
export const createVote = async (req, res) => {
  try {
    const { userId, pollOptionId } = req.body;

    if (!userId || !pollOptionId) {
      return res.status(400).json({
        success: false,
        message: "UserId and pollOptionId are required",
      });
    }

    // check if pollOption exists
    const pollOption = await prisma.pollOption.findUnique({
      where: { id: pollOptionId },
      select: { pollId: true },
    });

    if (!pollOption) {
      return res.status(400).json({
        success: false,
        message: "PollOption not found",
      });
    }

    // create vote
    const vote = await prisma.vote.create({
      data: { userId, pollOptionId },
    });

    // fetch updated poll with options + votes
    const updatedPoll = await prisma.poll.findUnique({
      where: { id: pollOption.pollId },
      include: {
        options: { include: { votes: true } },
      },
    });

    // broadcast updated results to poll room
    req.io.to(`poll_${pollOption.pollId}`).emit("pollResults", updatedPoll);

    res.status(201).json({
      success: vote ? true : false,
      message: vote ? "Vote created successfully" : "Vote creation failed",
      data: vote ? vote : null,
    });
  } catch (error) {
    console.error("Error in createVote: ", error);
    res.status(400).json({ success: false, error: error.message });
  }
};
