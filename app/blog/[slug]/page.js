import BlogPostContent from '@/components/BlogPostContent';
import { blogPosts } from '@/lib/blogData';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  
  return {
    title: post ? `${post.title} — GapAnchor Blog` : 'Article Not Found',
    description: post?.excerpt || 'Read the latest insights from GapAnchor.',
  };
}

export default function BlogPostPage({ params }) {
  return <BlogPostContent params={params} />;
}
