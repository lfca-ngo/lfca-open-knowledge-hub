import { marked } from 'marked'
import React from 'react'

// Extend the default renderer to open links in a new window
// See: https://github.com/markedjs/marked/issues/655#issuecomment-383226346
const renderer = new marked.Renderer()
const linkRenderer = renderer.link
renderer.link = (href: string, title: string, text: string) => {
  const html = linkRenderer.call(renderer, href, title, text)
  return html.replace(
    /^<a /,
    '<a style="word-break: break-all;" target="_blank" rel="nofollow" '
  )
}

interface MarkdownContentProps {
  content: string
}

export function parseMarkdownContent(content: string): string {
  return marked.parse(content, {
    breaks: true,
    renderer,
  })
}

export const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: parseMarkdownContent(content),
      }}
    />
  )
}
