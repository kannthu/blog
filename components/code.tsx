import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const Code = ({ children, className }) => {
  const language = (className ?? "").replace(/language-/, "");

  if (!language || language.length === 0) {
    return (
      <code
        className={`
          [p_&]:text-sm
          [p_&]:px-1
          [p_&]:py-0.5
          [p_&]:rounded-sm
          [p_&]:bg-gray-200
          dark:[p_&]:bg-[#333]
        `}
      >
        {children}
      </code>
    );
  }

  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      PreTag="div"
      showLineNumbers
      wrapLines={true}
      customStyle={{
        background: "transparent",
        padding: "1.5rem 1rem",
      }}
      lineNumberStyle={{
        userSelect: "none",
      }}
      codeTagProps={{
        style: {
          fontSize: "0.9rem",
          fontFamily: "var(--font-mono)",
        },
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
};
