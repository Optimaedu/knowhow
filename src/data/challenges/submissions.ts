'use server'
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export const getSubmissions = async (challengeId: number, onlyPassed: boolean = false) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || !session.user || !session.user.id) {
        throw new Error('User not authorized')
    }

    try {
        const submissions = await prisma.submission.findMany({
            where: {
                challengeId,
                ...(onlyPassed ? { passed: true } : {}),
            },

            orderBy: {
                createdAt: 'desc',
            },

            select: {
                id: true,
                code: true,
                passed: true,
                createdAt: true,
                userId: true,
            },
        });

        return submissions;
    } catch (error) {
        console.error('Error fetching submissions:', error); // Hantering av fel
        throw new Error('Failed to fetch submissions');
    }
};