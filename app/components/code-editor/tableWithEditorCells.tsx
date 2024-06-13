"use client";

import { useMonaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { moduleIntelisensePlugin } from "./moduleIntelisensePlugin";
import { EditableTable } from "./table/editableTable";

const TableWithEditorCells = () => {
  const monaco = useMonaco();

  const [languageId, _] = useState(
    `${Math.round(Math.random() * 1000)}_module`
  );

  // initialize module plugin for moanco instance
  useEffect(() => {
    if (!monaco) {
      return;
    }

    const dispose = moduleIntelisensePlugin(monaco, languageId);

    return () => {
      dispose();
    };
  }, [monaco]);

  return (
    <div>
      <EditableTable
        monaco={monaco}
        languageId={languageId}
        title="Table with DSL cells"
        items={[
          {
            key: `contains("123", "1") == true`,
            value: "does_not_exists",
            isEnabled: true,
          },
          { key: "1 == 1", value: "value2", isEnabled: true },
        ]}
      />
    </div>
  );
};

export { TableWithEditorCells };
