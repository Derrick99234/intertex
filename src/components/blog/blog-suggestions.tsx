"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/constants";

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  imageCover: string;
  slug: string;
  createdAt: string;
}

interface BlogSuggestionsProps {
  excludeSlug: string;
}

const BlogSuggestions = ({ excludeSlug }: BlogSuggestionsProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blog`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch blog suggestions:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const suggestions = posts
    .filter((post) => post.slug !== excludeSlug)
    .slice(0, 4);

  if (loading) {
    return (
      <div className="mt-16 px-8 flex flex-col items-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 w-full">
          More blogs you might be interested in
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[7px] w-[92%] justify-items-center">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden md:w-[303px] md:h-[321px] w-[303px] h-[281px] p-2 shadow-[0px_0px_32px_0px_#0000000F]"
            >
              <div className="animate-pulse bg-gray-200 rounded-lg md:w-[288px] md:h-[205px] w-[288px] h-[205px]" />
              <div className="mt-2 space-y-2">
                <div className="animate-pulse bg-gray-200 h-4 w-3/4 rounded" />
                <div className="animate-pulse bg-gray-200 h-3 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-16 px-8 flex flex-col items-center mb-8">
      <h2 className="text-4xl md:text-5xl font-bold mb-8 w-full">
        More blogs you might be interested in
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[7px] w-[92%] justify-items-center">
        {suggestions.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-xl overflow-hidden md:w-[303px] md:h-[321px] w-[303px] h-[281px] p-2 shadow-[0px_0px_32px_0px_#0000000F]"
          >
            <div className="relative h-48">
              <Image
                src={post.imageCover}
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
