import {
  editor,
  Position,
  Range,
} from "monaco-editor/esm/vs/editor/editor.api.js";
import { EditorSuggestion } from "./suggestions";

// it will match all variables and functions with their arguments
// but not things inside strings
const MATCH_ALL_WORDS_REGEX =
  /(\w+\.|\.\w|\w)+(?=([^"`]*["`][^"`]*["`])*[^"`]*$)/gi; // https://regexr.com/78jou

const getFunctionsAndVariablesFromExpressionString = (
  match: editor.FindMatch,
  hoverPostion: Position
) => {
  if (!match.matches) {
    return;
  }

  let matchPosition = match.range.getStartPosition();

  const expression = match.matches[0];

  // find all words
  const results = [...(expression.matchAll(MATCH_ALL_WORDS_REGEX) ?? [])];

  if (!results) {
    return;
  }

  // we need to find the word that is under the cursor
  for (let result of results) {
    console.log(result);
    const resultStartPosition = matchPosition.with(
      undefined,
      matchPosition.column + (result.index ?? 0)
    );
    const resultEndPosition = matchPosition.with(
      undefined,
      resultStartPosition.column + result[0].length
    );

    if (
      hoverPostion.isBeforeOrEqual(resultEndPosition) &&
      !hoverPostion.isBeforeOrEqual(resultStartPosition)
    ) {
      return {
        word: result[0],
        range: new Range(
          resultStartPosition.lineNumber,
          resultStartPosition.column,
          resultEndPosition.lineNumber,
          resultEndPosition.column
        ),
      };
    }
  }
};

const findHoverSuggestionForWord = (
  suggestions: EditorSuggestion[],
  wordRange: Range,
  word: string
) => {
  const containsDot = word.includes(".");

  if (!containsDot) {
    const suggestion = suggestions.find(s => s.insertText === word);

    if (!suggestion) {
      return;
    }

    return {
      suggestion,
      range: wordRange,
    };
  }

  // fo => handled below...
  // foo.ba => foo.children.includes(split)
  // foo.bar. => bar.children
  // foo.bar.b => bar.children.includes(split)
  // foo.bar.baz => []
  const parts = word.split(".").filter(s => s.trim() !== "");

  let i = 0;
  let children = suggestions;

  for (const part of parts) {
    const found = children.find(c => c.insertText === part);
    const isLast = parts.length - 1 === i++;

    if (found && isLast) {
      return {
        suggestion: found,
        range: wordRange,
      };
    }

    if (found && found.children) {
      children = found.children;
    }
  }
};

const findSuggestionForHover = (
  suggestions: EditorSuggestion[],
  model: editor.ITextModel,
  position: Position
) => {
  const lines = model.getLinesContent();
  const content = lines.join("\n");
  const match: editor.FindMatch = {
    _findMatchBrand: undefined,
    range: new Range(1, 1, lines.length, lines[lines.length - 1].length),
    matches: [content],
  };

  const result = getFunctionsAndVariablesFromExpressionString(match, position);

  if (!result) {
    return;
  }

  return findHoverSuggestionForWord(suggestions, result.range, result.word);
};

export { findSuggestionForHover, getFunctionsAndVariablesFromExpressionString };
