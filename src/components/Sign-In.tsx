'use client'
import Github from './ui/github'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const signIn = async () => {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/',
    })
  }

  return (
    <div className="flex items-center justify-center min-h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Sign in to Knowhow</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={signIn}>
            <Github /> Login with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
