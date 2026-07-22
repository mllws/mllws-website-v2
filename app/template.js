/**
 * Remounts on every navigation so the enter animation always plays.
 * Layout stays mounted (header/footer); only page content animates.
 */
export default function Template({ children }) {
  return <div className="page-enter">{children}</div>;
}
