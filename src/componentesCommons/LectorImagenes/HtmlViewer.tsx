
import  { useMemo } from 'react';
import DOMPurify from 'dompurify';

export interface HtmlViewerProps {
  html: string;
  className?: string;
  sanitize?: boolean;
}

const HtmlViewer = ({html = "", className, sanitize}:HtmlViewerProps) => {
   const safeHtml = useMemo(() => {
    if (!sanitize) return html;

    return DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
    });
  }, [html, sanitize]);
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  )
}

export default HtmlViewer;

