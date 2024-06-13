import {
  editor,
  MarkerSeverity,
} from "monaco-editor/esm/vs/editor/editor.api.js";
import { EditorSuggestion } from "./suggestions";
import { Evaluate } from "./evaluator";
import { FUNCTIONS_MAP, REQUEST_VARIABLES } from "./dslFunctions";

const validateExpressions = (
  model: editor.ITextModel,
  suggestions: EditorSuggestion[]
) => {
  const markers: editor.IMarkerData[] = [];

  const additionalVariables: {
    [key: string]: string;
  } = {};

  suggestions.forEach(suggestion => {
    additionalVariables[suggestion.insertText] = "string";
  });

  const lines = model.getLinesContent();
  const content = lines.join("\n");

  if (content === "") {
    return markers;
  }

  const [, error] = Evaluate(
    content,
    {
      ...additionalVariables,
      ...REQUEST_VARIABLES,
    },
    FUNCTIONS_MAP
  );

  if (error !== undefined && error !== "" && error !== null) {
    console.log(error, {
      ...additionalVariables,
      ...REQUEST_VARIABLES,
    });
    markers.push({
      message: error,
      severity: MarkerSeverity.Error,
      startLineNumber: 0,
      startColumn: 0,
      endLineNumber: lines.length - 1,
      endColumn: lines[lines.length - 1].length,
    });
  }

  return markers;
};

const validate = (
  model: editor.ITextModel,
  suggestions: EditorSuggestion[]
): editor.IMarkerData[] => {
  const markers: editor.IMarkerData[] = [];

  markers.push(...validateExpressions(model, suggestions));

  return markers;
};

export { validate };
