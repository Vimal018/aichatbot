import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import fetch from "node-fetch";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface OpenRouterResponse {
  choices: {
    message: ChatMessage;
  }[];
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
          "you are a health care AI assistant. Offer tools for managing health, including symptom checking, medication reminders, and home remedies in less than 50 words",
      },
      ..._chats,
    ];

    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

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

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter Error Response:", errorText);
      return res.status(500).json({ message: "Failed to get AI response" });
    }

    const data = (await response.json()) as OpenRouterResponse;
    const responseMessage = data.choices?.[0]?.message;

    if (responseMessage) {
      user.chats.push(responseMessage);
      await user.save();
    }

    return res.status(200).json({ chats: user.chats });
  } catch (error: any) {
    console.error("generateChatCompletion Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error: any) {
    console.error("sendChatsToUser Error:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error: any) {
    console.error("deleteChats Error:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
