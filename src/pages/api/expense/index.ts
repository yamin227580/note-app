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
    const expensesAllData = await prisma.expense.findMany({
      where: { email: session.user?.email },
    });
    const laborAllData = await prisma.labor.findMany({
      where: { email: session.user?.email },
    });
    const projectAllData = await prisma.project.findMany({
      where: { email: session.user?.email },
    });
    const expensesDataWithLaborType = expensesAllData.filter((expense) =>
      laborAllData.some((labor) => labor.laborType === expense.laborType)
    );
    const expensesData = expensesDataWithLaborType.filter((expense) =>
      projectAllData.some((project) => project.siteName === expense.siteName)
    );
    return res.send({ expensesData });
  } else if (req.method === "POST") {
    const { date, laborType, number, siteName } = req.body;
    const email = session.user?.email;
    if (!date || !laborType || !number || !siteName)
      return res.status(405).send("bad request!Missing required field");
    const expensesData = await prisma.expense.create({
      data: { siteName, laborType, number, date, email },
    });
    return res.send({ expensesData });
  } else if (req.method === "DELETE") {
    const idToDelete = Number(req.query.id);
    if (!idToDelete)
      return res.status(405).send("bad request!Missing required fields");

    const deletedExpenseId = await prisma.expense.delete({
      where: { id: idToDelete },
    });

    return res.send({ deletedExpenseId });
  } else if (req.method === "PUT") {
    const { idToEdit, expenseData } = req.body;
    if (!idToEdit && expenseData)
      return res.status(405).send("bad request!Missing required fields");
    const updatedExpenseId = await prisma.expense.update({
      data: {
        siteName: expenseData.siteName,
        laborType: expenseData.laborType,
        date: expenseData.date,
        number: expenseData.number,
      },
      where: { id: idToEdit },
    });

    return res.send({ updatedExpenseId });
  }
  res.status(200).json({ name: "John Doe" });
}
