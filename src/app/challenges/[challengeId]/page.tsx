import Challenge from '@/components/Challenge'
import React from 'react'
import { getChallengeById } from '@/data/challenges/challenge'
import { getSubmissions } from '@/data/challenges/submissions'

type Props = {
  params: {
    challengeId: string
  }
}

export default async function ChallengePage({ params }: Props) {
  const { challengeId } = await params
  const challenge = await getChallengeById(challengeId)
  const submissions = await getSubmissions(Number(challengeId))

  return <Challenge challenge={challenge} submissions={submissions} />
}
