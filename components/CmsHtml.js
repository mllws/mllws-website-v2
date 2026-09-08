export default function CmsHtml({ html, className = "prose-content" }) {
  if (!html || !String(html).trim()) return null;
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
