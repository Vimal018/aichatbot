import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import fetch from "node-fetch"; // Ensure you have node-fetch installed

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered or Token Malfunctioned" });
    }

    const _chats: ChatMessage[] = user.chats.map((chat: any) => ({
      role: chat.role,
      content: chat.content,
    }));

    const chats: ChatMessage[] = [
      {
        role: "system",
        content:
          "You are a health care AI assistant. Offer tools for managing health, including symptom checking, medication reminders, and home remedies in less than 50 words.",
      },
      ..._chats,
      { role: "user", content: message },
    ];

    user.chats.push({ content: message, role: "user" });

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: chats,
      }),
    });

    const data = await response.json();

    // Debug logs if something fails
    if (!data || !data.choices || !data.choices[0]?.message?.content) {
      console.error("Unexpected OpenRouter response:", JSON.stringify(data));
      return res.status(500).json({
        message: "AI model did not return a valid response.",
        error: data,
      });
    }

    const responseMessage = data.choices[0].message;

    user.chats.push(responseMessage);
    await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (error: any) {
    console.error("Error in generateChatCompletion:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
