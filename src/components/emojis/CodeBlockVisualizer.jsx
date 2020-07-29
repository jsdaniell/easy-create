import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

export default function CodeBlockVisualizer({selectedLanguage, unicode}) {
  function getCodeSnippet(lang) {
    switch (lang) {
      case "javascript":
        return `String.fromCodePoint(0x${unicode})`;
      case "phyton":
        return `print("\\U000${unicode}")`;
      case "css":
        return `h1::before  {
  content: "\\${unicode}";
}`;
      case "html":
        return `<p>&#${unicode}4</p>`;
      case "java":
        return `new String(Character.toChars(0x${unicode}));`;
      case "dart":
        return `String.fromCharCode(0x${unicode})`;
    }
  }

  return (
    <SyntaxHighlighter language={selectedLanguage}>
      {getCodeSnippet(selectedLanguage)}
    </SyntaxHighlighter>
  );
}
