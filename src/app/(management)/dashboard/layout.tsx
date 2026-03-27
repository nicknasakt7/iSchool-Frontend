import SidebarWrapper from '@/components/layouts/dashboard/sidebar-wrapper';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-1 bg-muted/40 ">
      <SidebarWrapper>
        <div className="ml-64 animate-in fade-in slide-in-from-bottom-2 duration-1500 ease-out">
          {children}
        </div>
      </SidebarWrapper>
    </main>
  );
}
