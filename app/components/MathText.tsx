"use client";

import { BlockMath, InlineMath } from "react-katex";

function renderInline(text: string, key: string) {
  const pieces = text.split(/(\$[^$\n]+\$)/g);
  return pieces.map((piece, index) => piece.startsWith("$") && piece.endsWith("$")
    ? <InlineMath key={`${key}-${index}`} math={piece.slice(1, -1)} errorColor="#e64980" renderError={() => <code>{piece}</code>} />
    : <span key={`${key}-${index}`}>{piece}</span>);
}

export function MathText({ content }: { content: string }) {
  const segments = content.split(/(\\\[[\s\S]*?\\\]|\\begin\{(?:align\*?|equation\*?|eqnarray\*?|split|array)\}[\s\S]*?\\end\{(?:align\*?|equation\*?|eqnarray\*?|split|array)\})/g);
  return (
    <div className="lesson-copy">
      {segments.map((segment, index) => {
        const block = segment.match(/^\\\[([\s\S]*)\\\]$/) || segment.match(/^\\begin\{[^}]+\}([\s\S]*)\\end\{[^}]+\}$/);
        if (block) return <div className="math-scroll" key={index}><BlockMath math={block[1]} errorColor="#e64980" renderError={() => <pre>{segment}</pre>} /></div>;
        return segment.split(/\n+/).filter(Boolean).map((line, lineIndex) => {
          const clean = line.replace(/^\s*\{\}\s*$/, "").trim();
          if (!clean) return null;
          if (clean.startsWith("- ")) return <div className="lesson-bullet" key={`${index}-${lineIndex}`}><span />{renderInline(clean.slice(2), `${index}-${lineIndex}`)}</div>;
          if (clean.startsWith("[Interactive diagram")) return null;
          return <p key={`${index}-${lineIndex}`}>{renderInline(clean, `${index}-${lineIndex}`)}</p>;
        });
      })}
    </div>
  );
}
