import React from "react"

export const ProgressBar = ({ progress }: { progress: any }) => {
  return (
    <div className="progress-bar">
      <div className="active" style={{ width: `${progress}%` }} />
    </div>
  )
}
