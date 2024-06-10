import { SanityDocument } from "@sanity/client";
import Posts from "./Posts";
import { Tag } from "lucide-react";

const Category = ({ tag, posts }: { tag: SanityDocument; posts: SanityDocument[] }) => {
  return (
    <div>
      <h1 className="flex items-center gap-1 text-xl font-bold"><Tag /> {tag.title}</h1>
      <Posts posts={posts} />
    </div>
  );
};

export default Category;