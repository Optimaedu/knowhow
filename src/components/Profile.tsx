'use client'

import { authClient } from '@/lib/auth-client'
import { useState, useEffect, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Label } from './ui/label'
import Link from 'next/link'
import { User } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function Profile({
  challenges,
  userChallenges,
}: {
  challenges: Challenge[]
  userChallenges: Challenge[]
}) {
  const { data: session, isPending: sessionPending } = authClient.useSession()
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    if (session?.user?.id) {
      setName(session.user.name || '')
      setImage(session.user.image || '')
    }
  }, [session])

  const handleUpdateProfile = async () => {
    try {
      startTransition(async () => {
        await authClient.updateUser({
          image: image || undefined,
          name: name || undefined,
        })
        toast.success('Profile updated')
      })
    } catch (error) {
      console.error(error)
      toast.error('Failed to update profile')
    }
  }

  const handleDeleteUser = async () => {
    try {
      startTransition(async () => {
        await authClient.deleteUser()
        await authClient.signOut()
        toast.success('User deleted')
        router.push('/')
      })
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete user')
    }
  }

  const isLoading = sessionPending || isPending
  const hasCreatedChallenges = userChallenges.some(
    (challenge) => challenge.userId === session?.user?.id
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 space-y-8">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Profile</h1>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex gap-6">
                <Avatar className="size-24">
                  <AvatarImage
                    src={session?.user?.image || undefined}
                    alt={session?.user?.name || undefined}
                  />
                  <AvatarFallback className="text-2xl">
                    {session?.user?.name?.[0] || <User />}
                  </AvatarFallback>
                </Avatar>
                <div className="w-full flex flex-col gap-4">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="pfp"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Profile Picture URL
                    </Label>
                    <Input
                      id="pfp"
                      type="text"
                      placeholder="Enter image URL"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      disabled={isLoading}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleUpdateProfile}
                  disabled={isLoading}
                  className="w-full"
                >
                  Update Profile
                </Button>
                <TooltipProvider>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              disabled={isLoading || hasCreatedChallenges}
                              variant="destructive"
                            >
                              Delete Account
                            </Button>
                          </AlertDialogTrigger>
                          {!hasCreatedChallenges && (
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your account and remove
                                  your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteUser}>
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          )}
                        </AlertDialog>
                      </div>
                    </TooltipTrigger>
                    {hasCreatedChallenges && (
                      <TooltipContent>
                        <p>You currently have created challenges.</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold">Your Submissions</h2>
          {challenges.length === 0 ? (
            <div className="text-muted-foreground">
              No challenges attempted yet.
            </div>
          ) : (
            <div className="grid gap-4">
              {challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-muted rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link
                    href={`/challenges/${challenge.id}`}
                    className="text-lg font-semibold hover:underline"
                  >
                    {challenge.title}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1">
                    {challenge.description}
                  </p>
                  <div className="mt-4 flex items-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        challenge.submission?.[0]?.passed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {challenge.submission?.[0]?.passed
                        ? 'Completed'
                        : 'Not completed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
