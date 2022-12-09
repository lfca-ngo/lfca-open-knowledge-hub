import { marked } from 'marked'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import PlainTextRenderer from 'marked-plaintext'
import React from 'react'

// Extend the default renderer to open links in a new window
// See: https://github.com/markedjs/marked/issues/655#issuecomment-383226346
const htmlRenderer = new marked.Renderer()
const linkRenderer = htmlRenderer.link
htmlRenderer.link = (href: string, title: string, text: string) => {
  const html = linkRenderer.call(htmlRenderer, href, title, text)
  return html.replace(
    /^<a /,
    '<a style="word-break: break-all;" target="_blank" rel="nofollow" '
  )
}

const plainTextRenderer = new PlainTextRenderer()

interface MarkdownContentProps {
  content: string
}

export function markdownContentToHtml(content: string): string {
  return marked.parse(content, {
    breaks: true,
    renderer: htmlRenderer,
  })
}

export function markdownContentToPlainText(content: string): string {
  return marked.parse(content, {
    breaks: true,
    renderer: plainTextRenderer,
  })
}

export const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: markdownContentToHtml(content),
      }}
    />
  )
}
