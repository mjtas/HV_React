import React, { useState } from 'react';

interface BlogPost {
  title: string;
  date: string;
  text: string;
  image: string;
  latest: boolean;
  show?: boolean;
}

const SubscriptionForm: React.FC = () => {
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      botField: '' // Honeypot field
    });
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      
    try {
      const formPayload = new URLSearchParams();
      formPayload.append('form-name', 'newsletter');
      formPayload.append('bot-field', ''); // Add empty honeypot value
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formPayload.toString(),
      });
  
      setIsSubscribed(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Submission failed. Please try again.');
    }
  };

  if (isSubscribed) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 w-full max-w-md">
        <div className="text-center">
          <h4 className="text-lg font-semibold text-green-800 mb-2">
            Thank You!
          </h4>
          <p className="text-green-700">
            You've successfully subscribed to our newsletter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 w-full max-w-md">      
      <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Subscribe to Our Newsletter
      </h4>
      
      <form 
        name="newsletter"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input type="hidden" name="form-name" value="newsletter" />

        {/* Honeypot field */}
        <div className="hidden">
                <label>
                  Don't fill this out: <input name="bot-field" onChange={handleChange} />
                </label>
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
        
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer"
        >
          Subscribe
        </button>
      </form>
      
      <p className="text-xs text-gray-500 mt-3 text-center">
        Stay up to date with our latest workshops and monthly blog post
      </p>
    </div>
  );
};

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