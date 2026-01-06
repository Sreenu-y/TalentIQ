import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    //using clerkId for stream (not mongoDB _id) => it should match the id we have in the stream dashboard
    const token = chatClient.createToken(req.user.clerkId);

    res.status(201).json({
      token,
      userId: req.user.clerkId,
      userName: req.user.name,
      userImage: req.user.image,
    });
  } catch (error) {
    console.error("Error in getStreamToken Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
