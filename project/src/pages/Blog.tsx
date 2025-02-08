import React, { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding the Power of SIP Investment",
    description: "Learn how small, regular investments through SIP can lead to significant wealth creation over time.",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "March 15, 2024"
  },
  {
    id: 2,
    title: "Lumpsum vs SIP: Which Investment Strategy Is Right for You?",
    description: "Compare the benefits and drawbacks of one-time investments versus systematic investment plans.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "March 12, 2024"
  },
  {
    id: 3,
    title: "The Magic of Compound Interest",
    description: "Discover how compound interest can accelerate your wealth creation journey.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "March 10, 2024"
  },
  {
    id: 4,
    title: "Investment Tips for Beginners",
    description: "Essential guidelines for those starting their investment journey in the stock market.",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "March 8, 2024"
  },
  {
    id: 5,
    title: "How to Choose the Right Mutual Fund",
    description: "A comprehensive guide to selecting mutual funds that align with your investment goals.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "March 5, 2024"
  },
  {
    id: 6,
    title: "Tax Benefits of SIP Investments",
    description: "Understanding the tax advantages of investing through Systematic Investment Plans.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "March 1, 2024"
  }
];

const Blog = () => {
  const [visiblePosts, setVisiblePosts] = useState(3);

  const loadMore = () => {
    setVisiblePosts(prev => Math.min(prev + 3, blogPosts.length));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Investment Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.slice(0, visiblePosts).map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <time className="text-sm text-gray-500">{post.date}</time>
              <h2 className="mt-2 text-xl font-semibold text-gray-900">
                {post.title}
              </h2>
              <p className="mt-3 text-gray-600">
                {post.description}
              </p>
              <button className="mt-4 text-[#2B9EB3] font-medium hover:text-[#238999] transition-colors">
                Read more →
              </button>
            </div>
          </article>
        ))}
      </div>

      {visiblePosts < blogPosts.length && (
        <div className="mt-12 text-center">
          <button
            onClick={loadMore}
            className="bg-[#2B9EB3] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#238999] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2B9EB3] focus:ring-offset-2"
          >
            Load More Posts
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;