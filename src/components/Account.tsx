'use client'
import { authClient } from '@/lib/auth-client'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export default function Account() {
  const { data: session } = authClient.useSession()
  const router = useRouter()
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh()
        },
      },
    })
  }

  return (
    <div>
      <p>{session?.user?.email}</p>
      {session && <Button onClick={handleSignOut}>Signout</Button>}
    </div>
  )
}
