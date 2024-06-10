"use client"

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SanityDocument } from "@sanity/client";

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

const mainNavItems = [
  { pathname: "/writings", name: "Explore" },
  { pathname: "/writings/archive", name: "Archive" },
  { pathname: "/writings/lorem", name: "Lorem" },
];

export default function NavigationMenuDemo({ categories }: { categories: SanityDocument[] }) {
  const path = usePathname();

  const isCategoryPageActive = categories.some(
    (category) => path === `/writings/${category.title.toLowerCase().replace(/\s+/g, '-')}`
  );

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {mainNavItems.slice(0, 2).map((item) => (
          <NavigationMenuItem key={item.pathname}>
            <Link href={item.pathname} legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), path === item.pathname && "text-pink-500")}>
                {item.name}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(isCategoryPageActive && "text-pink-500")}>
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {categories.map((category) => (
                <ListItem
                  key={category._id}
                  title={category.title}
                  href={`/writings/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {category.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {mainNavItems.slice(2).map((item) => (
          <NavigationMenuItem key={item.pathname}>
            <Link href={item.pathname} legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), path === item.pathname && "text-pink-500")}>
                {item.name}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  const path = usePathname();

  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            { "text-pink-500": path === props.href },
            className
          )}
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
