import {
  languages,
  Position,
  Range,
  IMarkdownString,
} from "monaco-editor/esm/vs/editor/editor.api.js";
import { Monaco } from "@monaco-editor/react";

export interface EditorSuggestion {
  label: string;
  description?: string;
  hoverDescription: IMarkdownString[];
  kind?: languages.CompletionItemKind;
  insertText: string;
  children?: EditorSuggestion[];
}
const buildSuggestions = (
  instance: Monaco,
  suggestions: EditorSuggestion[],
  position: Position
): languages.CompletionItem[] => {
  return suggestions.map((suggestion): languages.CompletionItem => {
    let insertText = suggestion.insertText;

    return {
      label: suggestion.label,
      kind: suggestion.kind ?? instance.languages.CompletionItemKind.Variable,
      detail: suggestion.description,
      insertTextRules: 1,
      insertText,
      range: new Range(
        position.lineNumber,
        position.column - 1,
        position.lineNumber,
        position.column
      ),
    };
  });
};

export { buildSuggestions };
