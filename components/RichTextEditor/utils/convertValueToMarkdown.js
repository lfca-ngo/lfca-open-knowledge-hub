import { Text } from "slate"

export function convertValueToMarkdown(nodes) {
  return nodes.map((n) => serialize(n)).join("\n")
}

function serialize(node, prefix) {
  if (Text.isText(node)) {
    let string = node.text
    if (node.bold) {
      string = `**${string}**`
    }
    if (node.italic) {
      string = `*${string}*`
    }
    return string
  }

  switch (node.type) {
    case "link": {
      const text = node.children.map((n) => serialize(n)).join("")
      return `[${text}](${node.url})`
    }
    case "numbered-list": {
      const items = node.children
        .map((n, i) => serialize(n, `${i + 1}.`))
        .join("")
      return items
    }
    case "bulleted-list": {
      const items = node.children.map((n) => serialize(n, "-")).join("")
      return items
    }
    case "list-item": {
      const children = node.children.map((n) => serialize(n)).join("")
      return `${prefix} ${children}\n`
    }
    case "paragraph":
    default:
      return node.children.map((n) => serialize(n)).join("")
  }
}
