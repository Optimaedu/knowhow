import React from 'react'
import { getChallengeById } from '@/data/challenges/challenge'
import {
  getSubmissions,
  getUserSubmission,
} from '@/data/challenges/get-submissions'

export type Props = {
  params: {
    challengeId: string
  }
}

export default async function ChallengePage({ params }: Props) {
  const { challengeId } = await params
  const challenge = await getChallengeById(challengeId)

  const submissions = await getSubmissions(challenge.id)
  const userSubmission = await getUserSubmission(challenge.id)

  if (!submissions.length) return <h1>no submissions found</h1>

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h1>
          <b>Your solution:</b>
        </h1>
        <div>{userSubmission[0].code}</div>
      </div>
      <ul className="flex flex-col gap-4">
        <li>
          <b>Other users&apos; solutions:</b>
        </li>
        {submissions.map((submission) => {
          const submissionUser = submission.user.name

          return (
            <li key={submission.id}>
              <h1>{submissionUser}&apos;s code:</h1>
              <div>{submission.code}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
