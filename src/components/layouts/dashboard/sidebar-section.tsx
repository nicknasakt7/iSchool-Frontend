type Props = {
  title?: string;
  children: React.ReactNode;
};

export default function SidebarSection({ title, children }: Props) {
  return (
    <div className="space-y-2">
      {title && (
        <p className="px-4 pt-4 text-xs text-muted-foreground font-semibold">
          {title}
        </p>
      )}
      <div className="px-3 space-y-1">{children}</div>
    </div>
  );
}
