require('./styles.less')

interface SourceProps {
  src: string
  type: string
}

interface VideoWrapperProps {
  sources: Array<SourceProps>
  width?: string
  height?: string
}

export const VideoWrapper = ({ height, sources, width }: VideoWrapperProps) => {
  return (
    <div className="video-wrapper">
      <video controls height={height || 'auto'} width={width || '100%'}>
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
