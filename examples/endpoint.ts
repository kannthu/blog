import { PrismaClient } from "@prisma/client";
import { hello } from "../hello";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
console.log("test");
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { id, name, email } = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Assume req.userId contains the authenticated user's ID
    const authenticatedUserId = req.userId;

    if (authenticatedUserId !== id) {
      return res.status(403).json({ error: "Forbidden: You are not authorized to update this profile" });
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          name,
          email,
        },
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({
        error: "Error updating user profile",
        details: (error as any).message,
      });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
