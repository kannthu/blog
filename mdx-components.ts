import { A as a } from "@/app/components/a";
import { P as p } from "@/app/components/p";
import { H1 as h1 } from "@/app/components/h1";
import { H2 as h2 } from "@/app/components/h2";
import { H3 as h3 } from "@/app/components/h3";
import { OL as ol } from "@/app/components/ol";
import { UL as ul } from "@/app/components/ul";
import { LI as li } from "@/app/components/li";
import { HR as hr } from "@/app/components/hr";
import { Code as code } from "@/app/components/code";
import { Tweet } from "@/app/components/tweet";
import { Image } from "@/app/components/image";
import { Figure } from "@/app/components/figure";
import { Snippet } from "@/app/components/snippet";
import { Caption } from "@/app/components/caption";
import { Callout } from "@/app/components/callout";
import { YouTube } from "@/app/components/youtube";
import { Ref, FootNotes, FootNote } from "@/app/components/footnotes";
import { Blockquote as blockquote } from "@/app/components/blockquote";
import { EditorSmallInput } from "./app/components/inputCodeEditor";
import { CustomDSLInput } from "./app/components/code-editor/complexCodeEditor";
import { WithCaption } from "./app/components/withCaption";
import { TableWithEditorCells } from "./app/components/code-editor/tableWithEditorCells";

export function useMDXComponents(components: {
  [component: string]: React.ComponentType;
}) {
  return {
    ...components,
    a,
    h1,
    h2,
    h3,
    p,
    ol,
    ul,
    li,
    hr,
    code,
    pre: Snippet,
    img: Image,
    blockquote,
    Tweet,
    Image,
    Figure,
    Snippet,
    Caption,
    Callout,
    YouTube,
    Ref,
    FootNotes,
    FootNote,
    WithCaption,
    EditorSmallInput,
    CustomDSLInput,
    TableWithEditorCells,
  };
}
