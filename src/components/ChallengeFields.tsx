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
