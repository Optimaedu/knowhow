import Challenge from '@/components/Challenge'
import React from 'react'
import { getChallengeById } from '@/data/challenges/challenge'

export type Props = {
  params: {
    challengeId: string
  }
}

export default async function ChallengePage({ params }: Props) {
  const { challengeId } = await params
  const challenge = await getChallengeById(challengeId)

  return <Challenge {...challenge} />
}
