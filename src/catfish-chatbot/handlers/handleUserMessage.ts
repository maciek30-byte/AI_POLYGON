import { Request, Response } from "express";

interface PostMessageBody {
  sessionID: string;
  msg: string;
}

type SessionRecord = { role: string; content: string };

export const sessions = new Map<string, SessionRecord[]>();

export const handlePostMessage = (req: Request<{}, {}, PostMessageBody>, res: Response) => {
  const { sessionID, msg } = req.body || {}

  if (!sessionID || !msg) {
    return res.status(400).json({ error: "Brak wymaganych pól: sessionID lub msg" });
  }

  if (!sessions.has(sessionID)) sessions.set(sessionID, []);
  const history = sessions.get(sessionID);

  if(!history) return
  history.push({ role: "user", content: msg });

  const reply = msg; // echo
  history.push({ role: "assistant", content: reply });

  console.log(sessionID, "→", history.length, "msgs");
  res.json({ msg: reply });
};

//TODO For now it is on the RAM memory, only on the demonstrating purpose, but it will be nice to store it on DB, or FileSystem