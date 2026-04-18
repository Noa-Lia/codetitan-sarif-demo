import jwt from 'jsonwebtoken';
import { hash } from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function createApiKey(userId: string, name: string) {
  const payload = { userId, name, createdAt: new Date() };

  const token = jwt.sign(payload, JWT_SECRET);

  const signature = token.split('.')[2];
  const hashed = await hash(signature, 12);

  return { token, hashed };
}

export function verifyApiKey(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
