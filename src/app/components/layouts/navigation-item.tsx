import { PropsWithChildren } from "react";

type NavigationItemProps = {
  href: string;
  isActive: boolean;
} & PropsWithChildren;

// export default function NavigationItem({
//     href,
//     children,
//     isActive = false
// })
