import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/index";

/**
 * NOT PART OF ASSIGNMENT
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const lists = await prisma.list.findMany({
        include: {
          todos: true,
        },
      });

      console.log(lists);

      res.send(lists);
    } else if (req.method === "POST") {
      const list = req.body;
      const result = await prisma.list.create({ data: list });

      res.json(result);
    }
  } catch (err) {
    console.log(err);
    res.send({ error: "Something went wrong with a network request" });
  }
}
