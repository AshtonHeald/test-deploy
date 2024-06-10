"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const about = [
  {
    title: "Ash",
    href: "/about/ash",
    description: "About the Creator",
  },
  {
    title: "Cafe",
    href: "/about/cafe",
    description: "About the Digital Garden",
  },
];

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Writings", href: "/writings" },
  { name: "Gallery", href: "/gallery" },
  { name: "Shop", href: "/shop" },
];

export default function NavigationMenuDemo() {
  const path = usePathname();
  const isAboutPageActive = about.some(item => path === item.href);

  return (
    <NavigationMenu className="mx-auto">
      <NavigationMenuList>
        {menuItems.map((item, index) => (
          <>
            {index === 1 && (
              <NavigationMenuItem key="about">
                <NavigationMenuTrigger className={cn(isAboutPageActive && "text-pink-500")}>
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {about.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
            <NavigationMenuItem key={item.name}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    (item.href === "/" ? path === item.href : path.startsWith(item.href)) && "text-pink-500"
                  )}
                >
                  {item.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  const path = usePathname();

  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground",
            path === href && "text-pink-500",
            className
          )}
          href={href}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
