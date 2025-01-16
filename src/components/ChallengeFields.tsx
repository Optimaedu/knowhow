import React from "react"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"

export default async function challengeFields() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex items-center flex-col pt-6">
          <div className="flex gap-2">
            <span className="font-semibold">Challenge name</span>
            <span>(#2)</span> 
          </div>
          <span>difficulty: 3</span>
          <span className="h-[1px] w-3/4 bg-zinc-200"></span>
        </div>
        <div className="p-8 flex flex-col gap-6">
          <p className="px-6 italic">Description lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur rerum ex delectus fugiat nisi sint impedit.</p>
          <p className="">Instuctions lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores odio, blanditiis officia ratione cumque labore voluptas placeat libero fuga tempore. <br /> Omnis officia repellat, exercitationem officiis corrupti iste enim aliquam quae! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae nostrum, aliquid quae magnam, inventore esse sequi nulla placeat, dignissimos unde animi. Rerum, dolor ex illo fugit explicabo odit itaque dicta.</p>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Code editor</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />

          <ResizablePanel defaultSize={25} className="flex ">
            <div className="border-r-[1px] border-r-zinc-200 px-3 flex flex-col gap-2 pt-3">
              <Button variant="outline">Run</Button>
              <Button variant="outline">Stop</Button>
              <Button variant="outline">Check</Button>
            </div>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Console</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
};

// 'use client'

// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import ReactCodeMirror from '@uiw/react-codemirror'
// import { javascript } from '@codemirror/lang-javascript'

// export default function Challenge() {
//   const [code, setCode] = useState(`function reverse(str) {
//   // Your code here
// }`)

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex items-center gap-2 text-3xl font-bold mb-6">
//         Coding Challenge: Reverse a String
//         <Badge>Easy</Badge>
//       </div>

//       <div className="lg:flex lg:space-x-6">
//         <div className="lg:w-1/2 space-y-6 mb-6 lg:mb-0">
//           <div>
//             <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
//             <p>
//               Write a function that takes a string as input and returns the
//               reverse of that string. <br />
//             </p>
//               <ul className="list-disc pl-5">
//                 <li>
//                   If the input is &quot;hello&quot;, the output should be
//                   &quot;olleh&quot;.
//                 </li>
//               </ul>
            
//           </div>
//         </div>

//         <div className="lg:w-1/2 space-y-6">
//           <div>
//             <ReactCodeMirror
//               value={code}
//               onChange={setCode}
//               extensions={[javascript()]}
//               placeholder="Please enter JS code."
//               className="border rounded-lg"
//             />
//           </div>

//           <Button className="w-full">Check</Button>
//         </div>
//       </div>
//     </div>
//   )
// }
