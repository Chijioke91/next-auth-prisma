import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../lib/auth';

export const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return;
  }

  const { email, password } = req.body;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    return res.status(422).json({
      success: false,
      message:
        'Invalid Input: Ensure password is at least 7 characters7 characters long',
    });
  }

  const hashedPassword = await hashPassword(password);

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return res.status(422).json({
      success: false,
      message: 'User Already Exists ',
    });
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return res.status(201).json(user);
}
