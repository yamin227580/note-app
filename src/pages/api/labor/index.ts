// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Unauthorized");
  if (req.method === "GET") {
    const laborsData = await prisma.labor.findMany({
      where: { email: session.user?.email },
    });
    return res.send({ laborsData });
  } else if (req.method === "POST") {
    const isValid = req.body.laborType && req.body.price;
    if (!isValid)
      return res.status(405).send("bad request!Missing required field");
    const { laborType, price } = req.body;
    const laborsData = await prisma.labor.create({
      data: { laborType, price, email: session.user?.email },
    });
    return res.send({ laborsData });
  } else if (req.method === "DELETE") {
    const idToDelete = Number(req.query.id);
    if (!idToDelete)
      return res.status(405).send("bad request!Missing required fields");

    await prisma.labor.delete({ where: { id: idToDelete } });
    const laborsData = await prisma.labor.findMany({
      where: { email: session.user?.email },
    });
    return res.send({ laborsData });
  } else if (req.method === "PUT") {
    const { idToEdit, laborData } = req.body;
    if (!idToEdit && laborData)
      return res.status(405).send("bad request!Missing required fields");
    await prisma.labor.update({
      data: { laborType: laborData.laborType, price: laborData.price },
      where: { id: idToEdit },
    });
    const laborsData = await prisma.labor.findMany({
      where: { email: session.user?.email },
    });
    return res.send({ laborsData });
  }
  res.status(200).json({ name: "John Doe" });
}
