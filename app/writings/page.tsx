import { sanityFetch } from "@/sanity/lib/fetch";
import {
	featuredPostsQuery,
	postsQuery,
	categoriesQuery,
	tagsWithPostCountQuery,
} from "@/sanity/lib/queries";
import { SanityDocument } from "next-sanity";
import Posts from "../../components/Posts";
import Link from "next/link";
import { Folder } from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default async function Writings() {
	const [featuredPosts, allPosts, categories, tags] = await Promise.all([
		sanityFetch<SanityDocument[]>({ query: featuredPostsQuery }),
		sanityFetch<SanityDocument[]>({ query: postsQuery }),
		sanityFetch<SanityDocument[]>({ query: categoriesQuery }),
		sanityFetch<SanityDocument[]>({ query: tagsWithPostCountQuery }),
	]);

	return (
		<div className="flex gap-6 ">
			<div className="flex-1">
				<div id="featuredPosts">
					<h2>Featured Posts</h2>
					<Posts posts={featuredPosts} />
				</div>
				<div id="recentPosts">
					<h2>Recent Posts</h2>
					<Posts posts={allPosts} limit={3} />
				</div>
			</div>
			<div className="w-64">


			<Card>
					<CardHeader>
						<CardTitle>Categories</CardTitle>
					</CardHeader>
					<CardContent>
					<ul>
						{categories.map((category) => (
							<li key={category._id}>
								<Link
									className="flex gap-1 items-center"
									key={category.title}
									href={`/writings/${category.title.toLowerCase().replace(/\s+/g, "-")}`}
								>
									<Folder size={16} /> {category.title}
								</Link>
							</li>
						))}
					</ul>
					</CardContent>
				</Card>


				<Card>
					<CardHeader>
						<CardTitle>Tags</CardTitle>
					</CardHeader>
					<CardContent>
					<ul>
						{tags.map((tag) => (
							<li key={tag._id}>
								<Link
									href={`/writings/${tag.title.toLowerCase().replace(/\s+/g, "-")}`}
								>
									{tag.title} ({tag.postCount})
								</Link>
							</li>
						))}
					</ul>
					</CardContent>
					<CardFooter>
						View all tags
					</CardFooter>
				</Card>



				
				{/*
				<div>
					All Tags
					<ul>
						{tags.map((tag) => (
							<li key={tag._id}>{tag.title}</li>
						))}
					</ul>
				</div>
			*/}
			</div>
		</div>
	);
}
