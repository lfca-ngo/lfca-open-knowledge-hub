import React from "react"

// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
const InlineChromiumBugfix = () => (
  <span
    contentEditable={false}
    style={{
      fontSize: 0,
    }}
  >
    ${String.fromCodePoint(160) /* Non-breaking space */}
  </span>
)

export const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>
    case "link":
      return (
        <a {...attributes} href={element.url}>
          <InlineChromiumBugfix />
          {children}
          <InlineChromiumBugfix />
        </a>
      )
    case "list-item":
      return <li {...attributes}>{children}</li>
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>
    case "paragraph":
    default:
      return <div {...attributes}>{children}</div>
  }
}
