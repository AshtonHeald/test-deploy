/*
import { sanityFetch } from "@/sanity/lib/fetch";
import { postsQuery } from "@/sanity/lib/queries";
import { SanityDocument } from "next-sanity";
import Posts from "../components/Posts";
*/
import {Button } from "@/components/ui/button"

const Home = () => {
  return (
    <main className="max-w-7xl min-h-screen mx-auto px-4 py-16">
      <Button>Click me</Button>
    </main>
  )
}

export default Home

/*
export default async function Home() {
  const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery});
  return (
    <main className="max-w-7xl min-h-screen mx-auto px-4 py-16">
      <Posts posts={posts} />
    </main>
  );
}
*/