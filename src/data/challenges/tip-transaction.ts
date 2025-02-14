'use server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function tipTransaction({ challenge }: { challenge: Challenge }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session?.user?.id) {
        throw new Error('User not authorized')
    }

    const tips = await prisma.experience.findFirst({
        where: {
            userId: session.user.id,
            challengeId: challenge.id,
            value: -70,
        },
    })

    return tips
}
