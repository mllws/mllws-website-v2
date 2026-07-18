/**
 * Editorial pull-quote for breaking up long-form content on About/Team/
 * Constitution pages. Renders as a <blockquote> for correct semantics;
 * `cite` is optional attribution text, not a URL.
 */
export default function PullQuote({ children, cite }) {
  return (
    <blockquote className="pull-quote my-10">
      <p>{children}</p>
      {cite && (
        <footer className="mt-3 text-sm font-sans not-italic text-gray-600">
          — {cite}
        </footer>
      )}
    </blockquote>
  );
}
