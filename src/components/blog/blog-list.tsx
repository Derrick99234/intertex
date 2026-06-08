"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/constants";

function generateSlug(title: string): string {
  let slug = title.toLowerCase();

  slug = slug.replace(/\s+/g, "-");

  slug = slug.replace(/[^a-z0-9\-]/g, "");

  slug = slug.replace(/-\d+$/, "");

  return slug;
}

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  imageCover: string;
  slug: string;
  createdAt: string;
}

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchBlogPosts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/blog`);
      const data = await res.json();
      console.log(data);
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch blog posts:", err);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return (
    <div className="min-h-screen md:px-4 mb-12">
      <div className="md:h-[551px] bg-[#F8F9FB] md:px-4 mb-4">
        <nav
          className="hidden md:flex items-center text-sm text-gray-600 mb-2 py-2"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="hover:underline text-[#152F24] font-semibold text-xl font-['OpenSans']"
          >
            Home
          </Link>
          <Image
            src="/icons/arrow-left.png"
            alt="Arrow Left"
            width={16}
            height={16}
            className="mx-2"
          />
          <span className="text-[#152F24] text-xl font-normal font-['OpenSans']">
            Blog
          </span>
        </nav>

        <div className="bg-[#091697] md:rounded-lg text-white text-center md:py-10 md:px-4 mb-8 w-full md:h-[472px] h-[380px] flex flex-col justify-center items-center gap-10">
          <h1 className="text-4xl md:text-[90px] font-bold mb-1 md:mb-4">
            Our Blogs
          </h1>
          <div className="relative md:w-[1176px] w-[312px] mx-auto">
            <div className="w-full md:h-[72px] flex items-center bg-white rounded-md px-4 py-3">
              <Image
                src="/icons/search.png"
                alt="Search"
                width={21}
                height={21}
                className="opacity-40 mr-2"
              />
              <input
                type="text"
                placeholder="Search for an article"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none border-none text-base text-black placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="md:max-w-[1301px] mx-auto px-4 md:px-2 sm:px-6 lg:px-2">
        {filteredPosts.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-16">
            <Image
              src="/icons/search.png"
              alt="No results"
              width={48}
              height={48}
              className="opacity-40 mb-4"
            />
            <p className="text-lg md:text-2xl text-gray-500 font-semibold">
              No results found
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Try a different search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[27px] w-full justify-items-center ">
            {filteredPosts.map((post) => (
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
                    {post.title}
                  </h2>
                  <Link
                    href={`/blog/${post.title ? generateSlug(post.title) : ""}`}
                    className="inline-block text-[#525252] md:text-[14px] font-normal text-[14px]"
                  >
                    Click to view
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
