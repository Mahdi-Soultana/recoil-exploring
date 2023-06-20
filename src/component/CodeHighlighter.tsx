import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
const codeInit = `function greet() {
    console.log('Hello, world!');
  }`;
function CodeHighlighter({ code = codeInit }) {
  return (
    <SyntaxHighlighter
      language="typescript"
      style={atomDark}
      className="text-sm"
    >
      {code}
    </SyntaxHighlighter>
  );
}
export default CodeHighlighter;
