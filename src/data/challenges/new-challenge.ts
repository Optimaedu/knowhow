'use server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import type { Challenge } from '@prisma/client';

export const newChallenge = async (data: Omit<Challenge, 'id' | 'createdAt' | 'updatedAt' | 'userId' >) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user || !session.user.id) {
    throw new Error('User not authorized');
  }

  try {
    const challenge = await prisma.challenge.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });

    return challenge.id;
  } catch (error) {
    console.error('Error creating challenge:', error);
    throw new Error('Failed to create challenge');
  }
};
