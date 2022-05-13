import { Editor, Element, Transforms } from "slate"

export function unwrapLink(editor) {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
  })
}
