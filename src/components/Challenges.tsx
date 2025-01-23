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

export default function Challenges({
  challenges,
}: {
  challenges: Challenge[]
}) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl">Challenges</h1>
      </div>

      <div className="p-6 mt-4 border-[1px] rounded-md border-[E2E8F0]">
        <Table>
          <TableHeader className="w-full">
            <TableRow className="w-full">
              <TableHead className="w-[40%]">Title</TableHead>
              <TableHead className="w-[40%]">Description</TableHead>
              <TableHead className="w-[40%]">Level</TableHead>
              <TableHead className="w-[40%]">Created</TableHead>
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

              return (
                <Link
                  href={`/challenges/${challenge.id}`}
                  key={challenge.id}
                  legacyBehavior
                >
                  <TableRow className="cursor-pointer">
                    <TableCell className="w-[40%]">{challenge.title}</TableCell>
                    <TableCell className="w-[40%]">
                      {challenge.description}
                    </TableCell>
                    <TableCell className="w-[40%]">
                      {levelDescription}
                    </TableCell>
                    <TableCell className="w-[40%]">{createdAtResult}</TableCell>
                  </TableRow>
                </Link>
              )
            })}
          </TableBody>
        </Table>
        <Separator />
      </div>
    </div>
  )
}
