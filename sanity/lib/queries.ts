import { groq } from "next-sanity";

// Get all posts
export const postsQuery = groq`*[_type == "post"] | order(_createdAt desc) {
  slug,
  title,
  "authorName": author->name,
  _createdAt,
  mainImage,
  "imageURL": mainImage.asset->url,
  categories[]->{title}, 
  tags[]->{title},
}`;

// Get featured posts
export const featuredPostsQuery = groq`*[_type == "post" && featured == true] | order(_createdAt desc)[0..2] {
  slug,
  title,
  "authorName": author->name,
  _createdAt,
  mainImage,
  "imageURL": mainImage.asset->url,
  categories[]->{title}, 
  tags[]->{title},
}`;

// Get a single post by its slug
export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{ 
    title, 
    description, 
    "authorName": author->name,
    body, 
    _createdAt,
    mainImage, 
    categories[]->{title}, 
    tags[]->{title},
  }`;

// Get all post slugs
export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`;

// Get all categories
export const categoriesQuery = groq`*[_type == "category"] {
  _id,
  title,
  description,
}`;

// Get posts by category
export const postsByCategoryQuery = groq`*[_type == "post" && $categoryId in categories[]._ref] {
  _createdAt,
  title,
  slug,
  mainImage,
  categories[]->{title}, 
  tags[]->{title},
  "imageURL": mainImage.asset->url,
  "authorName": author->name,
}`;

// Get all tags
export const tagsQuery = groq`*[_type == "tag"] {
  _id,
  title,
}`;

// Get tags with post count and limit to top 10
export const tagsWithPostCountQuery = groq`
  *[_type == "tag"] {
    _id,
    title,
    "postCount": count(*[_type == "post" && references(^._id)])
  } | order(postCount desc)[0...10]
`;

// Get posts by tag
export const postsByTagQuery = groq`*[_type == "post" && $tagId in tags[]._ref] {
  _createdAt,
  title,
  slug,
  mainImage,
  categories[]->{title}, 
  tags[]->{title},
  "imageURL": mainImage.asset->url,
  "authorName": author->name,
}`;