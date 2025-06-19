import React, { useState } from 'react';
import SubscriptionForm from './subscription-form';

interface BlogPost {
  title: string;
  date: string;
  text: string;
  image: string;
  latest: boolean;
  show?: boolean;
}

const BlogPost: React.FC<{ post: BlogPost; onToggle: (title: string) => void }> = ({ 
  post, 
  onToggle 
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 bg-white rounded-lg shadow-lg mb-8">
      {/* Left side - Blog content */}
      <div className="space-y-4">
        <button
          onClick={() => onToggle(post.title)}
          className="text-left w-full group"
        >
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200 cursor-pointer">
            {post.title}
            <span className="ml-2 text-sm text-gray-500">
              {post.show ? '▼' : '▶'}
            </span>
          </h3>
        </button>
        
        {post.show && (
          <div 
            className="text-gray-700 leading-relaxed prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.text }}
          />
        )}
      </div>

      {/* Right side - Image and Subscription form */}
      <div className="flex flex-col items-center justify-center space-y-4">
    
        {post.show && (
          <div className="w-full max-w-md">
            <img
              className="w-full h-auto rounded-lg shadow-md object-cover"
              src={`/${post.image}.png`}
              alt={post.title}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/about.png'; // Fallback image
              }}
            />
            {post.latest && <SubscriptionForm />}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;