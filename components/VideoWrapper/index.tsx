require('./styles.less')

interface SourceProps {
  src: string
  type: string
}

interface VideoWrapperProps {
  sources: Array<SourceProps>
  width?: string
  height?: string
  autoPlay?: boolean
  muted?: boolean
}

export const VideoWrapper = ({
  autoPlay = false,
  height,
  muted,
  sources,
  width,
}: VideoWrapperProps) => {
  return (
    <div className="video-wrapper">
      <video
        autoPlay={autoPlay}
        controls
        height={height || 'auto'}
        muted={muted}
        width={width || '100%'}
      >
        {sources.map((sourceElement, i) => (
          <source
            key={`source-${i}`}
            src={sourceElement.src}
            type={sourceElement.type}
          />
        ))}
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
