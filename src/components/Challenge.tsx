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
            <p>
              Write a function that takes a string as input and returns the
              reverse of that string. <br />
              <ul className="list-disc pl-5">
                <li>
                  If the input is &quot;hello&quot;, the output should be
                  &quot;olleh&quot;.
                </li>
              </ul>
            </p>
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

          <Button className="w-full">Check</Button>
        </div>
      </div>
    </div>
  )
}
