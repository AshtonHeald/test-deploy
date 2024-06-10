import { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { Folder, Tag } from "lucide-react";
import Link from "next/link";

const builder = imageUrlBuilder(client);

const Post = ({ post }: { post: SanityDocument }) => {
	if (!post) {
		return <div>No post available</div>;
	}

	const convertDate = (date: string) => {
		return new Date(date).toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
	};

	return (
		<main>
			<h1>{post.title ?? "Untitled"}</h1>
			<p className="py-2 text-gray-400 text-xs font-light uppercase">
				{convertDate(post._createdAt)} •{" "}
				<Link href="/about/ash">{post.authorName}</Link>
			</p>

			<div className="flex space-x-2">
				{post.categories?.map((category: any) => (
					<Link
						className="text-gray-400 text-xs font-light uppercase flex gap-1 items-center"
						key={category.title}
						href={`/writings/${category.title.toLowerCase().replace(/\s+/g, "-")}`}
					>
						<Folder size={16} /> {category.title}
					</Link>
				))}
			</div>
      <div className="flex space-x-2">
				{post.tags?.map((tag: any) => (
					<Link
						className="text-gray-400 text-xs font-light uppercase flex gap-1 items-center"
						key={tag.title}
						href={`/writings/${tag.title.toLowerCase().replace(/\s+/g, "-")}`}
					>
						<Tag size={16} /> {tag.title}
					</Link>
				))}
			</div>
			<p>{post.description ?? "No description available"}</p>
			{post.mainImage && (
				<Image
					src={builder
						.image(post.mainImage)
						.width(300)
						.height(300)
						.url()}
					alt={post.mainImage.alt ?? ""}
					width={300}
					height={300}
				/>
			)}
			{post.body ? (
				<PortableText value={post.body} />
			) : (
				<p>No content available</p>
			)}
		</main>
	);
};

export default Post;
