import React, { useState, useEffect, useMemo } from 'react';
import BlogPost from '~/components/blog-post';


const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog data from JSON file
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/blogs.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: BlogPost[] = await response.json();
        // Initialise show property for each post
        const postsWithShow = data.map(post => ({
            ...post,
            show: post.latest === true
          }));
        setBlogPosts(postsWithShow);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog posts');
        console.error('Error loading blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  // Sort blog posts by date (newest first)
  const sortedBlogPosts = useMemo(() => {
    return [...blogPosts].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [blogPosts]);

  // Toggle post visibility
  const togglePost = (title: string) => {
    setBlogPosts(prevPosts =>
      prevPosts.map(post =>
        post.title === title
          ? { ...post, show: !post.show }
          : post
      )
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error loading blog posts</p>
            <p>{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
            Hidden Valley
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
            Blog
          </h2>
        </div>

        {sortedBlogPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No Blog Posts Yet
              </h3>
              <p className="text-gray-600">
                Check back later for updates and insights from Hidden Valley.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedBlogPosts.map((post, index) => (
              <BlogPost 
                key={`${post.title}-${index}`} 
                post={post} 
                onToggle={togglePost}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;