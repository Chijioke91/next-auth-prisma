import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { hashPassword, verifyPassword } from '../../../lib/auth';
import { prisma } from '../signup';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { newPassword, oldPassword } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return res.status(404).json({ success: false, message: 'User Not Found' });
  }

  const currentPassword = user.password;

  const isMatch = await verifyPassword(oldPassword, currentPassword);

  if (!isMatch) {
    return res
      .status(422)
      .json({ success: false, message: 'Incorrect Password Entered' });
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  res
    .status(200)
    .json({ message: 'Your Password has been updated', success: true });
};
