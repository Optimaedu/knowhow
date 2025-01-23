import Challenges from '@/components/Challenges'
import { getChallenges } from '@/data/challenges/get-challenges'

export default async function ChallengesPage() {
  const challenges = await getChallenges()

  return <Challenges challenges={challenges} />
}
