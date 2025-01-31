'use client'
import { authClient } from '@/lib/auth-client'
import { Button } from './ui/button'
import Github from './ui/github'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTransition } from 'react'

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()

  const signIn = async () => {
    startTransition(async () => {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/',
      })
    })
  }

  return (
    <div className="flex items-center justify-center h-full">
      <Card>
        <CardHeader>
          <CardTitle>Sign in to Knowhow</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={signIn} disabled={isPending}>
            <Github className="dark:invert invert-0" /> Continue with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
