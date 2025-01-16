'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ReactCodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'

export default function Challenge() {
  const [code, setCode] = useState(`function reverse(str) {
    // Your code here
}`)
  const [showTips, setShowTips] = useState(false)
  const [testResults, setTestResults] = useState<string[]>([])

  const runTests = () => {
    const tests = [
      { input: 'hello', expected: 'olleh' },
      { input: 'world', expected: 'dlrow' },
      { input: '', expected: '' },
    ]

    const results = tests.map((test, index) => {
      try {
        const userFunction = new Function(`return ${code}`)()
        const result = userFunction(test.input)
        if (result === test.expected) {
          return `Test ${index + 1}: Passed`
        } else {
          return `Test ${index + 1}: Failed (Expected "${
            test.expected
          }", got "${result}")`
        }
      } catch (error) {
        return `Test ${index + 1}: Error - ${error}`
      }
    })

    setTestResults(results)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 text-3xl font-bold mb-6">
        Coding Challenge: Reverse a String
        <Badge>Easy</Badge>
      </div>

      <div className="lg:flex lg:space-x-6">
        <div className="lg:w-1/2 space-y-6 mb-6 lg:mb-0">
          <div>
            <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
            <div>
              Write a function that takes a string as input and returns the
              reverse of that string.
              <ul className="list-disc pl-5">
                <li>
                  If the input is &quot;hello&quot;, the output should be
                  &quot;olleh&quot;.
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Tips:</h2>
            <Button
              size="sm"
              onClick={() => setShowTips(!showTips)}
              className="mb-2 "
            >
              {showTips ? 'Hide Tips' : 'Show Tips'}
            </Button>
            {showTips && (
              <ul className="list-disc pl-5">
                <li>
                  You can convert a string to an array of characters using the
                  spread operator [...str] or the split() method.
                </li>
                <li>
                  Arrays have methods like reverse() and join() that might be
                  useful.
                </li>
              </ul>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Test Results:</h2>
            {testResults.length > 0 ? (
              <ul className="list-disc pl-5">
                {testResults.map((result, index) => (
                  <li
                    key={index}
                    className={
                      result.includes('Passed')
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {result}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tests run yet.</p>
            )}
          </div>
        </div>

        <div className="lg:w-1/2 space-y-6">
          <div>
            <ReactCodeMirror
              value={code}
              onChange={setCode}
              extensions={[javascript()]}
              placeholder="Please enter JS code."
              className="border rounded-lg"
            />
          </div>

          <Button onClick={runTests} className="w-full">
            Check
          </Button>
        </div>
      </div>
    </div>
  )
}
