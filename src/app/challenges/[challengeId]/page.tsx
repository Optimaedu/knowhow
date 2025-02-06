import Challenge from '@/components/Challenge'
import React from 'react'
import { getChallengeById } from '@/data/challenges/challenge'

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ challengeId: string }>
}) {
  const id = (await params).challengeId
  const challenge = await getChallengeById(id)

  return <Challenge {...challenge} />
}
