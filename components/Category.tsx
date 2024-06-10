import { SanityDocument } from "@sanity/client";
import Posts from "./Posts";
import { FolderOpen } from "lucide-react";

const Category = ({ category, posts }: { category: SanityDocument; posts: SanityDocument[] }) => {
  return (
    <div>
      <h1 className="flex items-center gap-1 text-xl font-bold"><FolderOpen /> {category.title}</h1>
      <p>{category.description}</p>
      <Posts posts={posts} />
    </div>
  );
};

export default Category;