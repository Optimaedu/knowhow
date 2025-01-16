'use client'
import React from "react"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import ReactCodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'

export default function Challenge() {
  // setCode to boilerplate when page refreshes
  const [code, setCode] = useState(`function reverse(str) {
    // Your code here
  }`)
  const [consoleDisplay, setConsoleDisplay] = useState('')

  const checkCode = () => {
    setConsoleDisplay('> Your code: ' + code);
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border md:min-w-[450px]"
    >
    <ResizablePanel defaultSize={50}>
      <div className="container mx-auto p-6">
        <div className="flex items-center text-3xl font-bold mb-6">
          Coding Challenge: Reverse a String
        </div>
        <span>difficulty: <Badge>Easy</Badge></span>
        <span className="h-[1px] w-3/4 bg-zinc-200"></span>
        </div>
        <div className="px-8 flex flex-col gap-6">
          <p className="px-6 italic">Description lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p className="">Write a function that takes a string as input and returns the reverse of that string.</p>
          <ul className="list-disc pl-5">
                <li>
                  If the input is &quot;hello&quot;, the output should be
                  &quot;olleh&quot;.
                </li>
              </ul>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={75}> 
            <div className="flex h-full w-full items-center justify-center p-6">
              
              <ReactCodeMirror
                value={code}
                onChange={setCode}
                extensions={[javascript()]}
                placeholder="Please enter JS code."
                className="border rounded-lg "
              />
              
            </div>
          </ResizablePanel>
          <ResizableHandle />

          <ResizablePanel defaultSize={25} className="flex ">
            <div className="h-full w-full flex p-2 tracking-wide flex-col">
              <span className="pl-2">Console</span>
              <span className="h-[1px] w-full mb-2 bg-zinc-300"></span>
              <div>
               <i>{consoleDisplay}</i>
              </div>
            </div>
            <div className="border-l-[1px] border-r-zinc-200 flex justify-center items-center p-2">
              <Button onClick={checkCode} variant="outline" className="bg-black text-white h-full">Run</Button>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}