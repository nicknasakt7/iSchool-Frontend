import { usePathname } from "next/navigation";
import NavigationItem from "./navigation-item";

const NAVIGATION_ITEM = [
  { href: "/parents/student-info", title: "student" },
  { href: "/parents/payment", title: "payment" },
];

export default function MainNavigation() {
  const pathName = usePathname();

  return (
    <div className="text-cyan-700 flex gap-3">
      {NAVIGATION_ITEM.map((item) => (
        <NavigationItem
          key={item.href}
          href={item.href}
          isActive={
            pathName === "/"
              ? pathName === item.href
              : pathName.startsWith(item.href)
          }
        >
          {item.title}
        </NavigationItem>
      ))}
    </div>
  );
}
