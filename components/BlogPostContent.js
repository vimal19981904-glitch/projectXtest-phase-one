'use client';

import { use } from 'react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';

const getBadgeColor = (cat) => {
  switch (cat) {
    case 'WMS': return 'bg-[#0071E3]/10 text-[#0071E3]';
    case 'Job Support': return 'bg-[#34C759]/10 text-[#34C759]';
    case 'Career': return 'bg-[#FF9500]/10 text-[#FF9500]';
    case 'Industry News': return 'bg-[#AF52DE]/10 text-[#AF52DE]';
    default: return 'bg-[#6E6E73]/10 text-[#6E6E73]';
  }
};

export default function BlogPostContent({ params }) {
  const { slug } = use(params);
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center pt-20 px-6">
        <h1 className="text-[32px] font-bold text-[#1D1D1F] mb-6">Article not found</h1>
        <Link href="/blog" className="btn-primary no-underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-20 pb-20">
      <div className="max-w-[720px] mx-auto px-6">
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-[#0071E3] font-medium no-underline mb-10 hover:translate-x-[-4px] transition-transform"
        >
          <svg className="mr-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back to Blog
        </Link>

        {/* Content Header */}
        <header className="mb-12 animate-[slideUp_0.4s_ease]">
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider ${getBadgeColor(post.category)}`}>
              {post.category}
            </span>
          </div>
          <h1 className="text-[36px] md:text-[48px] font-bold text-[#1D1D1F] mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 py-6 border-y border-[#F5F5F7]">
            <div className="w-[40px] h-[40px] rounded-full bg-[#0071E3]/10 flex items-center justify-center text-[#0071E3] font-bold text-[18px]">
              {post.author[0]}
            </div>
            <div>
              <p className="text-[15px] font-semibold text-[#1D1D1F] m-0">{post.author}</p>
              <p className="text-[13px] text-[#6E6E73] m-0">{post.date}</p>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <article className="space-y-8 animate-[slideUp_0.5s_ease]">
          {post.body.map((p, i) => (
            <p key={i} className="text-[18px] md:text-[20px] text-[#1D1D1F] leading-relaxed font-normal opacity-90">
              {p}
            </p>
          ))}
        </article>

        {/* CTA Banner */}
        <section className="mt-20 p-8 md:p-12 bg-[#F5F5F7] rounded-[24px] text-center border border-[#D2D2D7]/30">
          <h2 className="text-[28px] font-bold text-[#1D1D1F] mb-4">Ready to accelerate your career?</h2>
          <p className="text-[16px] text-[#6E6E73] mb-8 max-w-[480px] mx-auto">
            Book a free demo today and learn how our expert-led programs and job support can help you succeed.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/domains/manhattan-wms-training" className="btn-primary no-underline flex items-center justify-center">
              Explore Training
            </Link>
            <Link href="/#booking" className="btn-secondary no-underline flex items-center justify-center">
              Book Free Demo
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
