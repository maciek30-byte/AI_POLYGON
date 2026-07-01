import { Request, Response } from "express";
import { Content } from "@google/genai";
import { GeminiService } from "../../shared/gemini.service.js";
import { ToolsHandler } from "../tools/toolsHandler.js";
import { toolsDeclarations } from "../tools/toolsDeclarations.js";

interface PostMessageBody {
  sessionID: string;
  msg: string;
}

export const sessions = new Map<string, Content[]>();
const geminiService = new GeminiService(process.env.GEMINI_API_KEY!);
const toolsHandler = new ToolsHandler();

export const handlePostMessage = async (req: Request<{}, {}, PostMessageBody>, res: Response) => {
  const { sessionID, msg } = req.body || {};

  if (!sessionID || !msg) {
    return res.status(400).json({ error: "We are missing required fields" });
  }

  if (!sessions.has(sessionID)) sessions.set(sessionID, []);

  const history = sessions.get(sessionID)!;

  try {
    const {text} = await geminiService.runAgentTurn({
      history,
      userMessage: msg,
      systemInstruction: ` this is prompt`,
      tools: toolsDeclarations,
      toolExecutor: async (name: string, args: any) => {
        switch (name) {
          case "get_package_status":
            return toolsHandler.get_package_status(args.packageid);

          case "redirect_package":
            return toolsHandler.redirect_package(args.packageid, args.destination, args.code);

          default:
            throw new Error(`${name} tool not found`);
        }
      },
    });
  } catch (error) {}
};
