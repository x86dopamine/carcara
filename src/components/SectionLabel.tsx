export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span>{children}</span>
      <i aria-hidden="true" />
    </div>
  );
}
