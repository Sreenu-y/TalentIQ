import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";

export async function createSession(req, res) {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty) {
      return res
        .status(400)
        .json({ message: "Problem and Difficulty are required" });
    }

    //generate a unique call_id for stream video
    const callId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;

    // create session in database
    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    //create stream video call
    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: { problem, difficulty, sessionId: session._id.toString() },
      },
    });

    //create chat messaging
    const channel = chatClient.channel("messaging", callId, {
      name: `${problem} Session`,
      created_by_id: clerkId,
      members: [clerkId],
    });
    await channel.create();

    return res.status(201).json({ session });
  } catch (error) {
    console.error("Error in createSession controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getActiveSessions(_, res) {
  try {
    const sessions = await Session.find({ status: "active" })
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage clerkId")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (error) {
    console.error("Error in getActiveSessions controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyRecentSessions(req, res) {
  try {
    const userId = req.user._id;

    //get sessions where user is either host or participant
    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    return res.status(200).json({ sessions });
  } catch (error) {
    console.error("Error in getMyRecentSessions controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getSessionById(req, res) {
  try {
    const { id } = req.params;

    const session = await Session.findById(id)
      .populate("host", "name email profileImage clerkId")
      .populate("participant", "name email profileImage clerkId");

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    return res.status(200).json({ session });
  } catch (error) {
    console.error("Error in getSessionById controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    if (!session.status !== "active")
      return res
        .status(400)
        .json({ message: "Cannot join a completed session " });

    if (session.host.toString() === userId.toString()) {
      return res
        .status(400)
        .json({ message: "Host cannot join their own session as participant" });
    }

    // check if session already full (has a participant)
    if (session.participant)
      return res.status(409).json({ message: "Session is full" }); //409 for conflict

    session.participant = userId;
    await session.save();

    const channel = chatClient.channel("messaging", session.callId);
    await channel.addMembers([clerkId]);

    return res.status(200).json({ session });
  } catch (error) {
    console.error("Error in joinSession controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function endSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const session = await Session.findById(id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    //check if user is host (cause host can only end session)
    if (session.host.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Only the Host can end the Session" });
    }

    //check if session is already completed
    if (session.status === "completed") {
      return res.status(400).json({ message: "Session is already ended" });
    }

    // delete stream video call
    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    // delete stream chat channel
    const channel = chatClient.channel("messaging", session.callId);
    await channel.delete();

    session.status = "completed";
    await session.save();

    return res.status(200).json({ message: "Session ended successfully" });
  } catch (error) {
    console.error("Error in endSession controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
