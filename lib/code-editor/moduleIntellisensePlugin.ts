import { Monaco } from "@monaco-editor/react";
import { getModuleintelisenseLanguage } from "./moduleIntelisense";

const moduleIntellisensePlugin = (monaco: Monaco, languageId: string) => {
  const {
    definition: moduleIntelisenseDefinition,
    setup: setupModuleIntelisense,
  } = getModuleintelisenseLanguage();

  console.log("Initializing module itelisense", languageId);
  monaco.languages.register({ id: languageId });

  const { dispose: tokensProviderDispose } =
    monaco.languages.setMonarchTokensProvider(
      languageId,
      moduleIntelisenseDefinition.language
    );

  const { dispose: languageFeaturesDispose } =
    monaco.languages.setLanguageConfiguration(
      languageId,
      moduleIntelisenseDefinition.conf
    );

  const moduleDispose = setupModuleIntelisense(monaco, languageId, []);

  return () => {
    console.log("Disposing monaco language features", languageId);
    // yamlDispose();
    moduleDispose();
    tokensProviderDispose();
    languageFeaturesDispose();
  };
};

export { moduleIntellisensePlugin };
