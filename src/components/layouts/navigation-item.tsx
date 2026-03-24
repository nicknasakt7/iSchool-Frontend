import { cn } from "@/lib/utils";
import Link from "next/link";
import { PropsWithChildren } from "react";

type NavigationItemProps = {
  href: string;
  isActive: boolean;
} & PropsWithChildren;

export default function NavigationItem({
  href,
  children,
  isActive = false,
}: NavigationItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex justify-center items-center rounded-lg hover:bg-muted/30",
        isActive ? " text-primary" : "hover:bg-muted/30 text-muted",
      )}
    >
      {children}
      {isActive && <span className="absolute h-1 bg-primary"></span>}
    </Link>
  );
}
