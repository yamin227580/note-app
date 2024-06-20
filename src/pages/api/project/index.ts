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
    const projectsData = await prisma.project.findMany({
      where: { email: session.user?.email },
    });
    return res.send({ projectsData });
  } else if (req.method === "POST") {
    const { siteAddress, siteName, date, totalPrice } = req.body;
    const email = session.user?.email;
    if (!siteAddress || !siteName || !date || !totalPrice)
      return res.status(405).send("bad request!Missing required field");
    const projectsData = await prisma.project.create({
      data: { siteName, siteAddress, totalPrice, date, email },
    });
    return res.send({ projectsData });
  } else if (req.method === "DELETE") {
    const idToDelete = Number(req.query.id);
    if (!idToDelete)
      return res.status(405).send("bad request!Missing required fields");

    const deletedProjectId = await prisma.project.delete({
      where: { id: idToDelete },
    });

    return res.send({ deletedProjectId });
  } else if (req.method === "PUT") {
    const { idToEdit, projectData } = req.body;
    if (!idToEdit && projectData)
      return res.status(405).send("bad request!Missing required fields");
    const updatedProjectId = await prisma.project.update({
      data: {
        siteName: projectData.siteName,
        siteAddress: projectData.siteAddress,
        date: projectData.date,
        totalPrice: projectData.totalPrice,
      },
      where: { id: idToEdit },
    });

    return res.send({ updatedProjectId });
  }
  res.status(200).json({ name: "John Doe" });
}
