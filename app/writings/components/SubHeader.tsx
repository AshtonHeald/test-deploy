import { SanityDocument } from "@sanity/client";
import { categoriesQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import SubNavigation from "./SubNavigation";
import { Rss } from "lucide-react";
import { Button } from "@/components/ui/button"

export const revalidate = 60;

export async function Header() {
  const categories: SanityDocument[] = await sanityFetch({ query: categoriesQuery });
  return (
    <header className="mb-4 flex justify-between">
      <SubNavigation categories={categories} />
      <Button className="flex items-center gap-1" variant="ghost">Subscribe<Rss size={16} /></Button>
      

    </header>
  );
}

export default Header;
