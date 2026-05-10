type RichTextSectionProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  center?: boolean;
};

export default function RichTextSection({ eyebrow, title, body, center }: RichTextSectionProps) {
  return (
    <section className="section">
      <div className={`container ${center ? 'center' : ''}`}>
        {eyebrow && <span className="section-label">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {title && <div className={`divider ${center ? 'center' : ''}`} />}
        {body && (
          <div 
            className="section-subtitle" 
            style={{ maxWidth: '800px', margin: center ? '0 auto' : '0' }}
            dangerouslySetInnerHTML={{ __html: body }} 
          />
        )}
      </div>
    </section>
  );
}
