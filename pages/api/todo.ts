import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/index";

/**
 * NOT PART OF ASSIGNMENT
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("received a request to todo");
  try {
    if (req.method === "GET") {
      const todos = prisma.todo.findMany({
        include: {
          list: true,
        },
      });

      res.send(todos);
    } else if (req.method === "POST") {
      const todo = req.body;
      const result = await prisma.todo.upsert({
        where: {
          id: todo.id,
        },
        create: todo,
        update: todo,
      });

      res.json(result);
    } else if (req.method === "DELETE") {
      const todo = req.body;
      const result = await prisma.todo.delete({ where: { id: todo.id } });

      console.log("deleting todo with id", todo.id);

      res.json(result);
    }
  } catch (err) {
    console.log(err);
  }
}
