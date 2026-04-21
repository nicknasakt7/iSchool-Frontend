// "use client";

import Headers from "@/components/features/homepage/layouts/headers";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Headers />
      {children}
    </div>
  );
}
