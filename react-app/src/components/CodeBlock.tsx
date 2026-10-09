import { useMemo } from "react";

// Minimal Python syntax highlighting with a single regex pass — no dependency.
// Handles comments, strings (incl. f-strings and triple quotes), keywords,
// common builtins, and numbers.

const TOKEN =
  /(#[^\n]*)|([rbfRBF]{0,2}(?:"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'))|\b(def|return|if|elif|else|for|while|in|not|and|or|is|None|True|False|import|from|as|class|try|except|finally|raise|with|pass|break|continue|lambda|yield|global|nonlocal|del|assert|self)\b|\b(print|input|len|int|float|str|bool|list|dict|set|tuple|range|open|sum|min|max|sorted|enumerate|zip|type|isinstance|abs|round|ord|chr)\b(?=\()|(\b\d[\d_.]*\b)/g;

interface Piece {
  text: string;
  cls: string | null;
}

function tokenize(code: string): Piece[] {
  const out: Piece[] = [];
  let last = 0;
  for (const m of code.matchAll(TOKEN)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push({ text: code.slice(last, idx), cls: null });
    const cls = m[1] ? "tok-c" : m[2] ? "tok-s" : m[3] ? "tok-k" : m[4] ? "tok-b" : "tok-n";
    out.push({ text: m[0], cls });
    last = idx + m[0].length;
  }
  if (last < code.length) out.push({ text: code.slice(last), cls: null });
  return out;
}

export default function CodeBlock({
  title,
  file,
  code,
  note,
}: {
  title: string;
  file: string;
  code: string;
  note?: string;
}) {
  const pieces = useMemo(() => tokenize(code), [code]);
  return (
    <figure className="codeblock">
      <figcaption>
        <span className="cb-title">{title}</span>
        <span className="cb-file">{file}</span>
      </figcaption>
      <pre>
        <code>
          {pieces.map((p, i) =>
            p.cls ? (
              <span key={i} className={p.cls}>
                {p.text}
              </span>
            ) : (
              p.text
            ),
          )}
        </code>
      </pre>
      {note && <div className="cb-note">{note}</div>}
    </figure>
  );
}
