"use client";

import { useMonaco } from "@monaco-editor/react";
import {
  editor,
  MarkerSeverity,
} from "monaco-editor/esm/vs/editor/editor.api.js";
import { useEffect, useState } from "react";
import { moduleIntelisensePlugin } from "./moduleIntelisensePlugin";
import { EditorSmallInput } from "../inputCodeEditor";
import { BiError } from "react-icons/bi";
import { EditableTable } from "./table/editableTable";

const MarkerSeverityToIcon = {
  [MarkerSeverity.Error]: <BiError color="red" size="20px" />,
  [MarkerSeverity.Warning]: <BiError color="orange" size="20px" />,
  [MarkerSeverity.Info]: <BiError color="blue" size="20px" />,
  [MarkerSeverity.Hint]: <BiError color="green" size="20px" />,
};

type CustomDSLInputProps = {
  input: string;
  languageId?: string;
  disableCustomDSL?: boolean;
  readOnly?: boolean;
};

const CustomDSLInput = ({
  input,
  languageId: initialLanguage,
  disableCustomDSL,
  readOnly,
}: CustomDSLInputProps) => {
  const [markers, setMarkers] = useState<editor.IMarkerData[]>([]);
  const [instance, setInstance] = useState<editor.IStandaloneCodeEditor>();

  const monaco = useMonaco();

  const [languageId, _] = useState(
    initialLanguage ?? `${Math.round(Math.random() * 1000)}_module`
  );

  // initialize module plugin for moanco instance
  useEffect(() => {
    if (!monaco) {
      return;
    }

    if (disableCustomDSL) {
      return;
    }

    const dispose = moduleIntelisensePlugin(monaco, languageId);

    const { dispose: disposeMarkers } = monaco.editor.onDidChangeMarkers(
      ([resource]) => {
        console.log(resource);
        const model = monaco.editor.getModel(resource);

        // this is a hack to only show markers for the current language
        if (model?.getLanguageId() !== languageId) {
          return;
        }

        const allMarkers = monaco.editor.getModelMarkers({ resource });

        const relevantMarkers = allMarkers.filter(marker => {
          return marker.severity !== MarkerSeverity.Hint;
        });

        setMarkers(relevantMarkers);
      }
    );

    return () => {
      dispose();
      disposeMarkers();
    };
  }, [monaco]);

  const onMount = (instance: editor.IStandaloneCodeEditor) => {
    setInstance(instance);
  };

  const markersRender = markers.map((marker, index) => {
    const Icon = MarkerSeverityToIcon[marker.severity];

    return (
      <div
        className="rounded-lg text-sm border border-red-200 bg-red-50 flex space-x-2 px-2 py-1 items-center"
        key={index}
        onClick={() => {
          if (instance) {
            instance.setPosition({
              lineNumber: marker.startLineNumber,
              column: marker.startColumn,
            });
            instance.focus();
          }
        }}
      >
        {Icon} <span>{marker.message}</span>
      </div>
    );
  });

  return (
    <div>
      <EditorSmallInput
        monaco={monaco}
        languageId={languageId}
        placeholder="Hello, I am your placeholder!"
        value={input}
        showTrailingSpaces={true}
        onInstance={onMount}
        readOnly={readOnly}
      />
      <div className="flex flex-col mt-3">{markersRender}</div>
    </div>
  );
};

export { CustomDSLInput };
