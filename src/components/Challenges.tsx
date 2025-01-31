import { formatDistanceToNow } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import getLevelDescription from '@/lib/level'
import { Button } from '@/components/ui/button'

export default function Challenges({
  challenges,
}: {
  challenges: Challenge[]
}) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl">Challenges</h1>
        <Button asChild>
          <Link href={'/challenges/new'}>New Challenge</Link>
        </Button>
      </div>

      <div className="p-6 mt-4 border-[1px] rounded-md border-[E2E8F0]">
        <Table>
          {challenges.length ? (
            <>
              <TableHeader className="w-full">
                <TableRow className="w-full">
                  <TableHead className="w-[25%]">Title</TableHead>
                  <TableHead className="w-[25%]">Description</TableHead>
                  <TableHead className="w-[25%]">Level</TableHead>
                  <TableHead className="w-[25%]">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {challenges.map((challenge: Challenge) => {
                  const createdAtResult = formatDistanceToNow(
                    new Date(challenge.createdAt),
                    {
                      addSuffix: true,
                    }
                  )

                  const levelDescription = getLevelDescription(challenge.level)
                  const challengeId = Number(challenge.id)

                  return (
                    <Link
                      href={`/challenges/${challengeId}`}
                      key={challengeId}
                      legacyBehavior
                    >
                      <TableRow className="cursor-pointer">
                        <TableCell className="w-[25%]">
                          {challenge.title}
                        </TableCell>
                        <TableCell className="w-[25%]">
                          {challenge.description}
                        </TableCell>
                        <TableCell className="w-[25%]">
                          {levelDescription}
                        </TableCell>
                        <TableCell className="w-[25%]">
                          {createdAtResult}
                        </TableCell>
                      </TableRow>
                    </Link>
                  )
                })}
              </TableBody>
            </>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell>No challenges available.</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
        <Separator />
      </div>
    </div>
  )
}
