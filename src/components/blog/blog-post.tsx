import Link from "next/link";
import Image from "next/image";
import BlogSuggestions from "./blog-suggestions";
import ShowcaseSection from "../showcase/showcase-section";

interface BlogPostProps {
  slug: string;
}

const getBlogPost = (slug: string) => {
  const posts = {
    "first-blog-post": {
      title: "Intertex won global award for men clothing",
      content: `
        <p>This is the full content of the first blog post.</p>
        <p>
            INTERTEX Wins Prestigious Global Award for Men's Clothing
            We are thrilled to announce that INTERTEX, Africa's leading fashion powerhouse, has won the Global Excellence Award for Men's Clothing! This prestigious recognition solidifies our position as an industry leader, celebrating our commitment to quality, innovation, and timeless style.

            Setting the Standard in Men's Fashion
            From the very beginning, INTERTEX has been dedicated to redefining men's fashion with premium fabrics, expert craftsmanship, and modern designs. Our collections seamlessly blend tradition with contemporary trends, allowing men to express confidence and sophistication in every outfit.

            A Recognition of Excellence
            The Global Excellence Award for Men’s Clothing is a testament to our hard work, creativity, and the unwavering trust of our customers. This honor recognizes brands that set new benchmarks in design, sustainability, and customer satisfaction, and we are incredibly proud to be among the best in the world.

            What This Means for Our Customers
            Winning this award drives us to push even further, ensuring that our customers continue to receive high-quality, trendsetting fashion that suits every occasion. Whether it’s formal wear, casual outfits, or statement pieces, INTERTEX remains committed to delivering excellence in every stitch.
            Thank You for Being Part of Our Journey

            We couldn't have achieved this milestone without our loyal customers, fashion enthusiasts, and the incredible INTERTEX team. Your support fuels our passion for innovation and style.
            Stay tuned for new collections, exclusive designs, and more exciting updates from INTERTEX. Join us as we take African fashion to the world!

            #INTERTEX #GlobalFashionLeader #AwardWinningStyle
        </p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      `,
      image: "/images/leftgroup.jpeg",
      date: "March 15, 2024",
      author: "John Doe",
    },
    "second-blog-post": {
      title: "Intertex won global award for men clothing",
      content: `
        <p>This is the full content of the second blog post.</p>
       <p>
            INTERTEX Wins Prestigious Global Award for Men's Clothing
            We are thrilled to announce that INTERTEX, Africa's leading fashion powerhouse, has won the Global Excellence Award for Men's Clothing! This prestigious recognition solidifies our position as an industry leader, celebrating our commitment to quality, innovation, and timeless style.

            Setting the Standard in Men's Fashion
            From the very beginning, INTERTEX has been dedicated to redefining men's fashion with premium fabrics, expert craftsmanship, and modern designs. Our collections seamlessly blend tradition with contemporary trends, allowing men to express confidence and sophistication in every outfit.

            A Recognition of Excellence
            The Global Excellence Award for Men’s Clothing is a testament to our hard work, creativity, and the unwavering trust of our customers. This honor recognizes brands that set new benchmarks in design, sustainability, and customer satisfaction, and we are incredibly proud to be among the best in the world.

            What This Means for Our Customers
            Winning this award drives us to push even further, ensuring that our customers continue to receive high-quality, trendsetting fashion that suits every occasion. Whether it’s formal wear, casual outfits, or statement pieces, INTERTEX remains committed to delivering excellence in every stitch.
            Thank You for Being Part of Our Journey

            We couldn't have achieved this milestone without our loyal customers, fashion enthusiasts, and the incredible INTERTEX team. Your support fuels our passion for innovation and style.
            Stay tuned for new collections, exclusive designs, and more exciting updates from INTERTEX. Join us as we take African fashion to the world!

            #INTERTEX #GlobalFashionLeader #AwardWinningStyle
        </p>
      `,
      image: "/images/leftgroup.jpeg",
      date: "March 14, 2024",
      author: "Jane Smith",
    },
  };

  return posts[slug as keyof typeof posts];
};

const BlogPost = ({ slug }: BlogPostProps) => {
  const post = getBlogPost(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className=" mb-12">
      <div className="md:h-[520px] bg-[#F8F9FB]  mb-4 ">
        <nav
          className="hidden md:flex items-center text-sm text-gray-600 mb-2 py-2 pl-12"
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
          <Link
            href="/blog"
            className="hover:underline text-[#152F24] font-semibold text-xl font-['OpenSans']"
          >
            Blog
          </Link>
          <Image
            src="/icons/arrow-left.png"
            alt="Arrow Left"
            width={16}
            height={16}
            className="mx-2"
          />
          <span className="text-[#152F24] text-xl font-normal font-['OpenSans']">
            <p className="flex items-center">
              {" "}
              Reading Article
              <Image
                src="/icons/arrow-left.png"
                alt="Arrow Left"
                width={16}
                height={16}
                className="mx-2"
              />
            </p>
          </span>
        </nav>

        <div className=" bg-[#152F24] text-white md:py-10 md:px-4 mb-8 w-full md:h-[451px] h-[198px] flex flex-col justify-center items-center">
          <h1 className="text-[22px] md:text-[80px] md:font-semibold font-bold mb-[-1px] md:mb-[-1px] md:w-[90%] w-[90%] leading-[1.10]">
            {post.title}
          </h1>
          <div className="md:w-[90%] w-[90%] flex items-start text-base md:text-3xl font-normal ">
            <span>{post.date}</span>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[199px] md:h-[549px] md:mb-8 mb-4">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div
          className="prose prose-lg max-w-none text-xs md:text-2xl font-normal "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
      <BlogSuggestions excludeSlug={slug} />
      <ShowcaseSection />
    </div>
  );
};

export default BlogPost;
