import { SanityDocument } from "@sanity/client";
import {
  categoriesQuery,
  postsByCategoryQuery,
  postQuery,
  postPathsQuery,
  tagsQuery,
  postsByTagQuery,
} from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import { client } from "@/sanity/lib/client";
import Category from "../../../components/Category";
import Post from "../../../components/Post";
import Tag from "../../../components/Tag";

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  const posts = await client.fetch(postPathsQuery);
  const categories = await client.fetch(categoriesQuery);
  const tags = await client.fetch(tagsQuery);

  const postPaths = posts.map((post: { params: { slug: string } }) => ({
    slug: [post.params.slug],
  }));

  const categoryPaths = categories.map((category: { title: string }) => ({
    slug: ["category", category.title.toLowerCase().replace(/\s+/g, "-")],
  }));

  const tagPaths = tags.map((tag: { title: string }) => ({
    slug: ["tag", tag.title.toLowerCase().replace(/\s+/g, "-")],
  }));

  return [...postPaths, ...categoryPaths, ...tagPaths];
}

const Page = async ({ params }: { params: { slug: string[] } }) => {
  const slug = params.slug.join("/");
  const categories = await sanityFetch<SanityDocument[]>({ query: categoriesQuery });
  const category = categories.find(
    (cat) => cat.title.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (category) {
    const posts = await sanityFetch<SanityDocument[]>({
      query: postsByCategoryQuery,
      params: { categoryId: category._id },
    });
    return <Category category={category} posts={posts} />;
  }

  const tags = await sanityFetch<SanityDocument[]>({ query: tagsQuery });
  const tag = tags.find(
    (tag) => tag.title.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (tag) {
    const posts = await sanityFetch<SanityDocument[]>({
      query: postsByTagQuery,
      params: { tagId: tag._id },
    });
    return <Tag tag={tag} posts={posts} />;
  }

  const post = await sanityFetch<SanityDocument>({ query: postQuery, params: { slug } });

  if (!post) {
    return <div>Content not found</div>;
  }

  return <Post post={post} />;
};

export default Page;
