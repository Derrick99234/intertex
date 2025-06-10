"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export const blogPosts = [
  {
    id: 1,
    slug: "first-blog-post",
    title: "Intertex won global award for men clothing",
    excerpt:
      "This is the first blog post excerpt. Click to read more about this interesting topic.",
    image: "/images/leftgroup.jpeg",
    date: "March 15, 2024",
    author: "John Doe",
  },
  {
    id: 2,
    slug: "second-blog-post",
    title: "Second Blog Post",
    excerpt:
      "Another fascinating blog post that you won't want to miss. Learn more about our latest insights.",
    image: "/images/leftgroup.jpeg",
    date: "March 14, 2024",
    author: "Jane Smith",
  },
  {
    id: 3,
    slug: "third-blog-post",
    title: "Third Blog Post",
    excerpt:
      "A third blog post that you won't want to miss. Learn more about our latest insights.",
    image: "/images/leftgroup.jpeg",
    date: "March 13, 2024",
    author: "John Doe",
  },
  {
    id: 4,
    slug: "fourth-blog-post",
    title: "Fourth Blog Post",
    excerpt:
      "A fourth blog post that you won't want to miss. Learn more about our latest insights.",
    image: "/images/leftgroup.jpeg",
    date: "March 12, 2024",
    author: "Jane Smith",
  },
  {
    id: 5,
    slug: "fifth-blog-post",
    title: "Fifth Blog Post",
    excerpt:
      "A fifth blog post that you won't want to miss. Learn more about our latest insights.",
    image: "/images/leftgroup.jpeg",
    date: "March 11, 2024",
    author: "Jane Smith",
  },
  {
    id: 6,
    slug: "sixth-blog-post",
    title: "Sixth Blog Post",
    excerpt:
      "A sixth blog post that you won't want to miss. Learn more about our latest insights.",
    image: "/images/leftgroup.jpeg",
    date: "March 10, 2024",
    author: "Jane Smith",
  },
  {
    id: 7,
    slug: "seventh-blog-post",
    title: "Seventh Blog Post",
    excerpt:
      "A seventh blog post that you won't want to miss. Learn more about our latest insights.",
    image: "/images/leftgroup.jpeg",
    date: "March 9, 2024",
    author: "Jane Smith",
  },
  {
    id: 8,
    slug: "eighth-blog-post",
    title: "Eighth Blog Post",
    excerpt:
      "An eighth blog post that you won't want to miss. Learn more about our latest insights.",
    image: "/images/leftgroup.jpeg",
    date: "March 8, 2024",
    author: "Jane Smith",
  },
  {
    id: 9,
    slug: "ninth-blog-post",
    title: "Ninth Blog Post",
    excerpt:
      "This is the ninth blog post excerpt. Click to read more about this interesting topic.",
    image: "/images/leftgroup.jpeg",
    date: "March 7, 2024",
    author: "Jane Smith",
  },
  {
    id: 10,
    slug: "tenth-blog-post",
    title: "Tenth Blog Post",
    excerpt:
      "This is the tenth blog post excerpt. Click to read more about this interesting topic.",
    image: "/images/leftgroup.jpeg",
    date: "March 6, 2024",
    author: "Jane Smith",
  },
  {
    id: 11,
    slug: "eleventh-blog-post",
    title: "Eleventh Blog Post",
    excerpt:
      "This is the eleventh blog post excerpt. Click to read more about this interesting topic.",
    image: "/images/leftgroup.jpeg",
    date: "March 5, 2024",
    author: "Jane Smith",
  },
  {
    id: 12,
    slug: "twelfth-blog-post",
    title: "Twelfth Blog Post",
    excerpt:
      "This is the twelfth blog post excerpt. Click to read more about this interesting topic.",
    image: "/images/leftgroup.jpeg",
    date: "March 4, 2024",
    author: "Jane Smith",
  },
  {
    id: 13,
    slug: "thirteenth-blog-post",
    title: "Thirteenth Blog Post",
    excerpt:
      "This is the thirteenth blog post excerpt. Click to read more about this interesting topic.",
    image: "/images/leftgroup.jpeg",
    date: "March 3, 2024",
    author: "Jane Smith",
  },
  {
    id: 14,
    slug: "fourteenth-blog-post",
    title: "Fourteenth Blog Post",
    excerpt:
      "This is the fourteenth blog post excerpt. Click to read more about this interesting topic.",
    image: "/images/leftgroup.jpeg",
    date: "March 2, 2024",
    author: "Jane Smith",
  },
  {
    id: 15,
    slug: "fifteenth-blog-post",
    title: "Fifteenth Blog Post",
    excerpt:
      "This is the fifteenth blog post excerpt. Click to read more about this interesting topic.",
    image: "/images/leftgroup.jpeg",
    date: "March 1, 2024",
    author: "Jane Smith",
  },
  {
    id: 16,
    slug: "sixteenth-blog-post",
    title: "Sixteenth Blog Post",
    excerpt:
      "This is the sixteenth blog post excerpt. Click to read more about this interesting topic.",
    image: "/images/leftgroup.jpeg",
    date: "March 0, 2024",
    author: "Jane Smith",
  },
];

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        )}
      </div>
    </div>
  );
};

export default BlogList;
