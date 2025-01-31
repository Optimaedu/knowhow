'use server'
import judge0 from '@/lib/judge0'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export default async function submitTest(code: string, challengeId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || !session.user || !session.user.id) {
    throw new Error('User not authorized')
  }

  const judge = await judge0(code)

  const userId = session!.user.id
  await prisma.submission.upsert({
    where: {
      userId_challengeId: { userId, challengeId },
    },
    update: {
      code,
      passed: false,
      createdAt: new Date(),
    },
    create: {
      userId,
      challengeId,
      code,
      passed: false,
    },
  })

  return judge
}
