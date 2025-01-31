'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ReactCodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { newChallenge } from '@/data/challenges/new-challenge'
import { useRouter } from 'next/navigation'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { githubLight } from '@uiw/codemirror-theme-github'
import { useTheme } from 'next-themes'

export default function CreateChallenge() {
  const { resolvedTheme } = useTheme()
  const [title, setTitle] = useState('')
  const [instructions, setInstructions] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [tips, setTips] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const [tests, setTests] = useState(`describe('reverse', [
  test('Reverse a simple string', () => {
    expect(reverse('hello')).toBe('olleh')
  }),
  test('Handle empty string', () => {
    expect(reverse('')).toBe('')
  }),
  test('Handle single character', () => {
    expect(reverse('a')).toBe('a')
  })
])`)
  const [boilerplate, setBoilerplate] = useState(`function reverse(str) {
  return str.split('').reverse().join('')
}`)

  const handleSubmit = async () => {
    if (isLoading) return
    setIsLoading(true)

    try {
      const createdChallengeId = await newChallenge({
        title,
        description: instructions,
        level: parseInt(difficulty, 10),
        tests,
        boilerplate,
        tips,
      })

      router.push(`/challenges/${createdChallengeId}`)
      router.refresh()
    } catch (error) {
      console.error('Error creating challenge:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>New Challenge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Challenge Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter challenge title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>

              <Textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Enter challenge instructions"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select onValueChange={setDifficulty} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Easy</SelectItem>
                  <SelectItem value="1">Medium</SelectItem>
                  <SelectItem value="2">Hard</SelectItem>
                  <SelectItem value="3">Extreme</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tips">Tips</Label>

              <ReactCodeMirror
                value={tips}
                onChange={setTips}
                extensions={[javascript()]}
                placeholder="Enter tips for the challenge"
                className="border rounded-lg w-full"
                theme={resolvedTheme === 'dark' ? vscodeDark : githubLight}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tests">Tests</Label>

              <ReactCodeMirror
                value={tests}
                onChange={setTests}
                extensions={[javascript()]}
                placeholder="Enter tests"
                className="border rounded-lg w-full"
                theme={resolvedTheme === 'dark' ? vscodeDark : githubLight}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="boilerplate">Boilerplate Code</Label>

              <ReactCodeMirror
                value={boilerplate}
                onChange={setBoilerplate}
                extensions={[javascript()]}
                placeholder="Enter boilerplate code"
                className="border rounded-lg w-full"
                theme={resolvedTheme === 'dark' ? vscodeDark : githubLight}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Challenge'}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
