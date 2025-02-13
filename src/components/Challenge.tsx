'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import ReactCodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { githubLight } from '@uiw/codemirror-theme-github'
import submitTest from '@/data/challenges/submitTest'
import getLevelDescription from '@/lib/level'
import { useTheme } from 'next-themes'
import { describe, test, expect } from '@/utils/testUtils'
import { BookText, Lightbulb, Terminal } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Challenge({
  challenge,
  previousSubmission,
}: ChallengeProps) {
  const { resolvedTheme } = useTheme()
  const [code, setCode] = useState('')
  const [showTips, setShowTips] = useState(false)
  const [testResults, setTestResults] = useState<string[]>([])
  const [passed, setPassed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (previousSubmission && previousSubmission.code) {
      setCode(previousSubmission.code)
      console.log('set code to previous submission: ', previousSubmission.code)
    } else {
      setCode(`${challenge.boilerplate}`)
      console.log('set code to boilerplate: ', challenge.boilerplate)
    }
  }, [previousSubmission, challenge.boilerplate])

  const runTests = async () => {
    try {
      const context = {
        describe,
        test,
        expect,
      }

      const results = new Function(
        ...Object.keys(context),
        `${code}\n return ${challenge.tests}`
      )(...Object.values(context)) as Array<TestResult>

      const userPassed = results.every((result) => result.passed === true)
      setPassed(userPassed)

      setTestResults(
        results.map(
          (result) =>
            `${result.passed ? '✓' : '✗'} ${result.description}${
              result.error ? `\n   ${result.error}` : ''
            }`
        )
      )

      if (!userPassed) {
        console.log('Test did not pass. Not sending submission to Judge0.')
        return
      }

      const judge0test = await submitTest(code, challenge.id)
      console.log('Judge0 response: ', judge0test)

      new Function(code)()
    } catch (error) {
      console.error('Test error:', error)
      setTestResults([`Error running tests: ${error}`])
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] w-full flex flex-col">
      <ResizablePanelGroup
        direction="horizontal"
        className="!flex-col lg:!flex-row"
      >
        <ResizablePanel
          defaultSize={50}
          minSize={25}
          maxSize={75}
          className="!basis-auto lg:!basis-0"
        >
          <div className="p-6">
            <div className="flex items-center gap-2 text-3xl font-bold mb-6">
              {challenge.title}
              <Badge>{getLevelDescription(challenge.level)}</Badge>
            </div>

            <Tabs
              defaultValue="instructions"
              orientation="vertical"
              className="flex flex-col lg:flex-row w-full gap-2"
            >
              <TabsList className="h-fit flex-row lg:flex-col gap-1 rounded-none bg-transparent px-1 py-0 text-foreground">
                <TabsTrigger
                  value="instructions"
                  className="relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
                >
                  <BookText className="-ms-0.5 me-1.5 opacity-60" size={16} />
                  Instructions
                </TabsTrigger>
                <TabsTrigger
                  value="solutions"
                  className="relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
                >
                  <Lightbulb className="-ms-0.5 me-1.5 opacity-60" size={16} />
                  Solutions
                </TabsTrigger>
                <TabsTrigger
                  value="tests"
                  className="relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
                >
                  <Terminal className="-ms-0.5 me-1.5 opacity-60" size={16} />
                  Tests
                </TabsTrigger>
              </TabsList>
              <div className="grow rounded-lg border border-border text-start">
                <TabsContent value="instructions" className="p-4 mt-0">
                  <div>{challenge.description}</div>
                </TabsContent>
                <TabsContent value="solutions" className="p-4 mt-0">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowTips(!showTips)}
                      >
                        {showTips ? 'Hide Tips' : 'Show Tips'}
                        <Lightbulb className="ml-2 size-4" />
                      </Button>
                      {previousSubmission?.passed && (
                        <Link
                          href={`/challenges/completed/${challenge.id}`}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          View Community Solutions →
                        </Link>
                      )}
                    </div>
                    {showTips && (
                      <div className="rounded-lg border bg-muted/50 p-4">
                        <h3 className="font-medium mb-2">Tips</h3>
                        <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                          <li>{challenge.tips}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="tests" className="p-4 mt-0">
                  <div>
                    <ReactCodeMirror
                      value={challenge.tests}
                      readOnly
                      extensions={[javascript()]}
                      className="w-full h-full"
                      theme={
                        resolvedTheme === 'dark' ? vscodeDark : githubLight
                      }
                    />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className="hidden lg:flex" />
        <ResizablePanel defaultSize={50} className="!basis-auto lg:!basis-0">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={75}>
              <ScrollArea className="h-full">
                <ReactCodeMirror
                  value={code}
                  onChange={setCode}
                  extensions={[javascript()]}
                  placeholder="Please enter JS code."
                  className="w-full h-full"
                  theme={resolvedTheme === 'dark' ? vscodeDark : githubLight}
                />
              </ScrollArea>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel
              defaultSize={25}
              maxSize={75}
              className="!basis-auto lg:!basis-0"
            >
              <div className="h-full w-full flex tracking-wide flex-col">
                <span className="p-2 px-4 border-b">Console</span>
                <ScrollArea className="h-full">
                  <div className="h-full p-2 px-4">
                    {testResults.length > 0 ? (
                      <div>
                        {testResults.map((result, index) => (
                          <div
                            key={index}
                            className={
                              result.includes('✓')
                                ? 'text-green-600'
                                : 'text-red-600'
                            }
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        Click run to see results.
                      </p>
                    )}
                  </div>
                </ScrollArea>
                <Button
                  className="rounded-none"
                  onClick={
                    passed
                      ? () =>
                          router.push(`/challenges/completed/${challenge.id}`)
                      : runTests
                  }
                >
                  {passed ? 'Continue' : 'Run'}
                </Button>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
