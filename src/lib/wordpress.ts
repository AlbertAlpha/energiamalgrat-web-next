// Description: WordPress API functions
// Used to fetch data from a WordPress site using the WordPress REST API

import type { ParsedUrlQueryInput } from "node:querystring";
import querystring from "node:querystring";
import type {
  WP_REST_API_Attachment,
  WP_REST_API_Category,
  WP_REST_API_Page,
  WP_REST_API_Post,
  WP_REST_API_Posts,
  WP_REST_API_Tag,
  WP_REST_API_User,
} from "wp-types";

// Custom Activity type for ACF fields
export type WP_REST_API_Activity = WP_REST_API_Post & {
  type: "activities";
  acf: {
    start_datetime: string;
    place: string;
    address: string;
    geo: {
      lat: number;
      lng: number;
      address: string;
    };
  };
};

const baseUrl = process.env.WORDPRESS_URL;

if (!baseUrl) {
  throw new Error("WORDPRESS_URL environment variable is not defined");
}

function getUrl(path: string, query?: ParsedUrlQueryInput) {
  const params = query ? querystring.stringify(query) : null;
  return `${baseUrl}${path}${params ? `?${params}` : ""}`;
}

class WordPressAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string,
  ) {
    super(message);
    this.name = "WordPressAPIError";
  }
}

async function wordpressFetch<T>(url: string): Promise<T> {
  const userAgent = "Next.js WordPress Client";

  const response = await fetch(url, {
    headers: {
      "User-Agent": userAgent,
    },
  });

  if (!response.ok) {
    throw new WordPressAPIError(`WordPress API request failed: ${response.statusText}`, response.status, url);
  }

  return response.json();
}

export async function getAllPosts(filterParams?: {
  author?: string;
  tag?: string;
  category?: string;
  search?: string;
}): Promise<WP_REST_API_Posts> {
  const query: ParsedUrlQueryInput = {
    _embed: true,
    per_page: 100,
  };

  if (filterParams?.search) {
    query.search = filterParams.search;
  }
  if (filterParams?.author) {
    query.author = filterParams.author;
  }
  if (filterParams?.tag) {
    query.tags = filterParams.tag;
  }
  if (filterParams?.category) {
    query.categories = filterParams.category;
  }

  const url = getUrl("/wp-json/wp/v2/posts", query);
  return wordpressFetch<WP_REST_API_Post[]>(url);
}

export async function getPostById(id: number): Promise<WP_REST_API_Post> {
  const url = getUrl(`/wp-json/wp/v2/posts/${id}`);
  return wordpressFetch<WP_REST_API_Post>(url);
}

export async function getPostBySlug(slug: string): Promise<WP_REST_API_Post | undefined> {
  const url = getUrl("/wp-json/wp/v2/posts", { slug });
  const response = await wordpressFetch<WP_REST_API_Post[]>(url);
  return response[0];
}

export async function getAllCategories(): Promise<WP_REST_API_Category[]> {
  const url = getUrl("/wp-json/wp/v2/categories");
  return wordpressFetch<WP_REST_API_Category[]>(url);
}

export async function getCategoryById(id: number): Promise<WP_REST_API_Category> {
  const url = getUrl(`/wp-json/wp/v2/categories/${id}`);
  return wordpressFetch<WP_REST_API_Category>(url);
}

export async function getCategoryBySlug(slug: string): Promise<WP_REST_API_Category | undefined> {
  const url = getUrl("/wp-json/wp/v2/categories", { slug });
  const response = await wordpressFetch<WP_REST_API_Category[]>(url);
  return response[0];
}

export async function getPostsByCategory(categoryId: number): Promise<WP_REST_API_Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { categories: categoryId });
  return wordpressFetch<WP_REST_API_Post[]>(url);
}

export async function getPostsByTag(tagId: number): Promise<WP_REST_API_Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { tags: tagId });
  return wordpressFetch<WP_REST_API_Post[]>(url);
}

export async function getTagsByPost(postId: number): Promise<WP_REST_API_Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags", { post: postId });
  return wordpressFetch<WP_REST_API_Tag[]>(url);
}

export async function getAllTags(): Promise<WP_REST_API_Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags");
  return wordpressFetch<WP_REST_API_Tag[]>(url);
}

export async function getTagById(id: number): Promise<WP_REST_API_Tag> {
  const url = getUrl(`/wp-json/wp/v2/tags/${id}`);
  return wordpressFetch<WP_REST_API_Tag>(url);
}

export async function getTagBySlug(slug: string): Promise<WP_REST_API_Tag | undefined> {
  const url = getUrl("/wp-json/wp/v2/tags", { slug });
  const response = await wordpressFetch<WP_REST_API_Tag[]>(url);
  return response[0];
}

export async function getAllPages(): Promise<WP_REST_API_Page[]> {
  const url = getUrl("/wp-json/wp/v2/pages");
  return wordpressFetch<WP_REST_API_Page[]>(url);
}

export async function getPageById(id: number): Promise<WP_REST_API_Page> {
  const url = getUrl(`/wp-json/wp/v2/pages/${id}`);
  return wordpressFetch<WP_REST_API_Page>(url);
}

export async function getPageBySlug(slug: string): Promise<WP_REST_API_Page | undefined> {
  const url = getUrl("/wp-json/wp/v2/pages", { slug });
  const response = await wordpressFetch<WP_REST_API_Page[]>(url);
  return response[0];
}

export async function getAllAuthors(): Promise<WP_REST_API_User[]> {
  const url = getUrl("/wp-json/wp/v2/users");
  return wordpressFetch<WP_REST_API_User[]>(url);
}

export async function getAuthorById(id: number): Promise<WP_REST_API_User> {
  const url = getUrl(`/wp-json/wp/v2/users/${id}`);
  return wordpressFetch<WP_REST_API_User>(url);
}

export async function getAuthorBySlug(slug: string): Promise<WP_REST_API_User | undefined> {
  const url = getUrl("/wp-json/wp/v2/users", { slug });
  const response = await wordpressFetch<WP_REST_API_User[]>(url);
  return response[0];
}

export async function getPostsByAuthor(authorId: number): Promise<WP_REST_API_Post[]> {
  const url = getUrl("/wp-json/wp/v2/posts", { author: authorId });
  return wordpressFetch<WP_REST_API_Post[]>(url);
}

export async function getPostsByAuthorSlug(authorSlug: string): Promise<WP_REST_API_Post[]> {
  const author = await getAuthorBySlug(authorSlug);
  if (!author) {
    throw new WordPressAPIError(
      `Author with slug "${authorSlug}" not found`,
      404,
      `/wp-json/wp/v2/users?slug=${authorSlug}`,
    );
  }
  const url = getUrl("/wp-json/wp/v2/posts", { author: author.id });
  return wordpressFetch<WP_REST_API_Post[]>(url);
}

export async function getPostsByCategorySlug(categorySlug: string): Promise<WP_REST_API_Post[]> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) {
    throw new WordPressAPIError(
      `Category with slug "${categorySlug}" not found`,
      404,
      `/wp-json/wp/v2/categories?slug=${categorySlug}`,
    );
  }
  const url = getUrl("/wp-json/wp/v2/posts", { categories: category.id });
  return wordpressFetch<WP_REST_API_Post[]>(url);
}

export async function getPostsByTagSlug(tagSlug: string): Promise<WP_REST_API_Post[]> {
  const tag = await getTagBySlug(tagSlug);
  if (!tag) {
    throw new WordPressAPIError(`Tag with slug "${tagSlug}" not found`, 404, `/wp-json/wp/v2/tags?slug=${tagSlug}`);
  }
  const url = getUrl("/wp-json/wp/v2/posts", { tags: tag.id });
  return wordpressFetch<WP_REST_API_Post[]>(url);
}

export async function getFeaturedMediaById(id: number): Promise<WP_REST_API_Attachment> {
  const url = getUrl(`/wp-json/wp/v2/media/${id}`);
  return wordpressFetch<WP_REST_API_Attachment>(url);
}

export async function searchCategories(query: string): Promise<WP_REST_API_Category[]> {
  const url = getUrl("/wp-json/wp/v2/categories", {
    search: query,
    per_page: 100,
  });
  return wordpressFetch<WP_REST_API_Category[]>(url);
}

export async function searchTags(query: string): Promise<WP_REST_API_Tag[]> {
  const url = getUrl("/wp-json/wp/v2/tags", {
    search: query,
    per_page: 100,
  });
  return wordpressFetch<WP_REST_API_Tag[]>(url);
}

export async function searchAuthors(query: string): Promise<WP_REST_API_User[]> {
  const url = getUrl("/wp-json/wp/v2/users", {
    search: query,
    per_page: 100,
  });
  return wordpressFetch<WP_REST_API_User[]>(url);
}

export async function getAllActivities(): Promise<WP_REST_API_Activity[]> {
  const query: ParsedUrlQueryInput = {
    _embed: true,
    per_page: 100,
  };

  const url = getUrl("/wp-json/wp/v2/activity", query);
  return wordpressFetch<WP_REST_API_Activity[]>(url);
}

export async function getActivityById(id: number): Promise<WP_REST_API_Activity> {
  const url = getUrl(`/wp-json/wp/v2/activity/${id}`);
  return wordpressFetch<WP_REST_API_Activity>(url);
}

export async function getActivityBySlug(slug: string): Promise<WP_REST_API_Activity | undefined> {
  const url = getUrl("/wp-json/wp/v2/activity", { slug });
  const response = await wordpressFetch<WP_REST_API_Activity[]>(url);
  return response[0];
}

export { WordPressAPIError };
