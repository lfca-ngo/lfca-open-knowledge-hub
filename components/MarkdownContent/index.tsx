import { marked } from 'marked'
import React from 'react'

// Extend the default renderer to open links in a new window
// See: https://github.com/markedjs/marked/issues/655#issuecomment-383226346
const renderer = new marked.Renderer()
const linkRenderer = renderer.link
renderer.link = (href: string, title: string, text: string) => {
  const html = linkRenderer.call(renderer, href, title, text)
  return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ')
}

interface MarkdownContentProps {
  content: string
}

export const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked.parse(content, {
          breaks: true,
          renderer,
        }),
      }}
    />
  )
}
