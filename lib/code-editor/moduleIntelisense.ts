import { Monaco } from "@monaco-editor/react";
import { languages } from "monaco-editor/esm/vs/editor/editor.api.js";
import { buildSuggestions, EditorSuggestion } from "./suggestions";
import { registerMarkerDataProvider } from "monaco-marker-data-provider";
import { validate } from "./validate";
import { findSuggestionForHover } from "./hover";
import { initialPropSuggestions } from "./initialSuggestions";

const richEditConfiguration: languages.LanguageConfiguration = {
  autoClosingPairs: [
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],

  surroundingPairs: [
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
};

const languageDefinition = <languages.IMonarchLanguage>{
  // The main tokenizer for our languages
  tokenizer: {
    root: [
      [
        // /\{\%/,
        /^/,
        { token: "@rematch", switchTo: "@handlebarsInSimpleState.root" },
      ],
    ],

    handlebarsInSimpleState: [
      [/\{\%/, "delimiter"],
      [/\%\}/, { token: "delimiter", switchTo: "@$S2.$S3" }],
      { include: "handlebarsRoot" },
    ],

    handlebarsInEmbeddedState: [
      [/\{\%\{?/, "delimiter"],
      [
        /\}\%\}?/,
        {
          token: "delimiter",
          switchTo: "@$S2.$S3",
          nextEmbedded: "$S3",
        },
      ],
      { include: "handlebarsRoot" },
    ],

    handlebarsRoot: [
      [/"[^"]*"/, "string"],
      [/[#/][^\s}]+/, "keyword.helper"],
      [/[\s]+/],
      [/[^}]/, "variable.parameter"],
    ],
  },
};

const setup = (
  monacoEditor: Monaco,
  pluginId: string,
  additionalSuggestions: EditorSuggestion[]
) => {
  const allTriggerLetters: string[] = [];

  for (let i = 97; i <= 122; i++) {
    allTriggerLetters.push(String.fromCharCode(i));
  }
  console.log(allTriggerLetters);

  const { dispose: completionDispose } =
    monacoEditor.languages.registerCompletionItemProvider(pluginId, {
      triggerCharacters: [...allTriggerLetters, ".", " "],
      provideCompletionItems: (
        _model,
        position
      ): languages.ProviderResult<languages.CompletionList> => {
        const suggestions = buildSuggestions(
          monacoEditor,
          [...initialPropSuggestions, ...additionalSuggestions],
          position
        );

        return {
          suggestions,
        };
      },
    });

  const { dispose: hoverDispose } =
    monacoEditor.languages.registerHoverProvider(pluginId, {
      provideHover(model, position) {
        const result = findSuggestionForHover(
          [...initialPropSuggestions, ...additionalSuggestions],
          model,
          position
        );

        if (result) {
          return {
            contents: result.suggestion.hoverDescription,
          };
        }
      },
    });

  let markerDataProvider = registerMarkerDataProvider(monacoEditor, pluginId, {
    owner: "module-intellisense",
    async provideMarkerData(model) {
      return validate(model, additionalSuggestions);
    },
  });

  return () => {
    completionDispose();
    hoverDispose();
    markerDataProvider.dispose();
  };
};

const getModuleintelisenseLanguage = () => {
  return {
    definition: {
      language: languageDefinition,
      conf: richEditConfiguration,
    },
    setup,
  };
};

export { getModuleintelisenseLanguage };
