"use client";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "./blog-list";

interface BlogSuggestionsProps {
  excludeSlug: string;
}

const BlogSuggestions = ({ excludeSlug }: BlogSuggestionsProps) => {
  const suggestions = blogPosts
    .filter((post) => post.slug !== excludeSlug)
    .slice(0, 4);

  return (
    <div className="mt-16 px-8 flex flex-col items-center mb-8">
      <h2 className="text-4xl md:text-5xl font-bold mb-8 w-full">
        More blogs you might be interested in
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[7px] w-[92%] justify-items-center">
        {suggestions.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl overflow-hidden md:w-[303px] md:h-[321px] w-[303px] h-[281px] p-2 shadow-[0px_0px_32px_0px_#0000000F]"
          >
            <div className="relative h-48">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover rounded-lg md:w-[288px] md:h-[205px] w-[288px] h-[205px]"
              />
            </div>
            <div className="">
              <h2 className="md:text-[13px] text-[12px] font-bold mb-2 mt-2">
                <span className="">New | </span>
                {post.title}
              </h2>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block text-[#525252] md:text-[14px] font-normal text-[14px]"
              >
                Click to view
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSuggestions;
