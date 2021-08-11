import { hash, compare } from 'bcryptjs';

export const hashPassword = async (password: string) => hash(password, 12);

export const verifyPassword = async (
  enteredPassword: string,
  hashedPassword: string
) => compare(enteredPassword, hashedPassword);
