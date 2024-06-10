import type { SanityDocument } from "@sanity/client";
import Image from "next/image";
import Link from "next/link";
import { Folder, Tag } from "lucide-react";



const Posts = ({
	posts = [],
	limit = 0,
}: {
	posts: SanityDocument[];
	limit?: number;
}) => {
	const convertDate = (date: string) => {
		return new Date(date).toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
	};

	const displayedPosts = limit ? posts.slice(0, limit) : posts;

	return (
		<div className="mx-auto grid grid-cols-1">
			<div className="grid grid-cols-1 gap-4">
				{displayedPosts.map((post) => (
					<div
						key={post._id}
						className="p-4 border flex flex-row items-center justify-between hover:opacity-90"
					>
						<Link href={`/writings/${post.slug.current}`}>
							<div>
								<h2 className="font-medium text-xl">
									{post.title}
								</h2>
								<p className="py-2 text-gray-400 text-xs font-light uppercase">
									{convertDate(post._createdAt)} •{" "}
									{post.authorName}
								</p>

								<div className="flex space-x-2">
									{post.categories?.map((category: any) => (
										<div
											key={category.title}
											className="text-gray-400 text-xs font-light uppercase flex gap-1 items-center"
										>
											<Folder size={16} />{" "}
											{category.title}
										</div>
									))}
								</div>
                <div className="flex space-x-2">
									{post.tags?.map((tag: any) => (
										<div
											key={tag.title}
											className="text-gray-400 text-xs font-light uppercase flex gap-1 items-center"
										>
											<Tag size={16} />{" "}
											{tag.title}
										</div>
									))}
								</div>
							</div>
              
						</Link>
						{post?.mainImage && (
							<Image
								className="w-32 object-fill rounded-lg"
								src={post.imageURL}
								alt={post.mainImage.alt}
								width={350}
								height={350}
								priority
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Posts;
