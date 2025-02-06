'use server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

export const getSubmissions = async (challengeId: number) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session || !session.user || !session.user.id) {
      throw new Error('User not authorized')
    }

    return await prisma.submission.findMany({
      where: {
        challengeId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  } catch (error) {
    console.error('Error fetching submissions for challenge:', error)
    throw error
  }
}

export const getUserSubmission = async (challengeId: number) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || !session.user || !session.user.id) {
    throw new Error('User not authorized')
  }
  const userId = session.user.id

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session || !session.user || !session.user.id) {
      throw new Error('User not authorized')
    }

    return await prisma.submission.findMany({
      where: {
        challengeId,
        userId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  } catch (error) {
    console.error('Error fetching submissions for challenge:', error)
    throw error
  }
}
