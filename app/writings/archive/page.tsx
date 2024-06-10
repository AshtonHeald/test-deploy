import { sanityFetch } from "@/sanity/lib/fetch";
import { postsQuery } from "@/sanity/lib/queries";
import { SanityDocument } from "next-sanity";
import Posts from "../../../components/Posts";

export default async function Archive() {
  const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery});
  return (
    <>
      <h2>All Posts</h2>
      <Posts posts={posts} />
    </>
  );
}
