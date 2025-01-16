
import { authClient } from '@/lib/auth-client'
import { Button } from './ui/button'
import Github from './ui/github'

export default function SignIn() {
	const signIn = async () => {
		await authClient.signIn.social({
			provider: 'github',
		})
	}

	return (
		<Button onClick={signIn}>
			<Github /> Login with GitHub
		</Button>
	)
}
