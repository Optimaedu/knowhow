import ChallengeFields from "@/components/ChallengeFields"
import React from "react"

export default async function challenge() {
  return (
    <div className="h-screen w-full flex flex-col">
      {/* <h1>Challenge page</h1> */}
      <ChallengeFields />
    </div>
  )
};
