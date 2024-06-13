import { Monaco } from "@monaco-editor/react";
import { getModuleintelisenseLanguage } from "./moduleIntelisense";

const moduleIntellisensePlugin = (monaco: Monaco, languageId: string) => {
  const {
    definition: moduleIntellisenseDefinition,
    setup: setupModuleIntelisense,
  } = getModuleintelisenseLanguage();

  // register new unique language
  monaco.languages.register({ id: languageId });

  const { dispose: tokensProviderDispose } =
    monaco.languages.setMonarchTokensProvider(
      languageId,
      moduleIntellisenseDefinition.language
    );

  const { dispose: languageFeaturesDispose } =
    monaco.languages.setLanguageConfiguration(
      languageId,
      moduleIntellisenseDefinition.conf
    );

  const moduleDispose = setupModuleIntelisense(monaco, languageId, []);

  return () => {
    console.log("Disposing monaco language features", languageId);
    moduleDispose();
    tokensProviderDispose();
    languageFeaturesDispose();
  };
};

export { moduleIntellisensePlugin };
