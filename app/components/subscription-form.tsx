import React, { useState } from 'react';

const SubscriptionForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    try {
      // Prepare form data for Netlify
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      
      // Convert to URLSearchParams
      const params = new URLSearchParams();
      formData.forEach((value, key) => {
        params.append(key, value.toString());
      });

      // Submit to root path
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      // Update UI
      setIsSubscribed(true);
      setEmail('');
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
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input type="hidden" name="form-name" value="newsletter" />

        <div style={{ display: 'none' }}>
          <label htmlFor="bot-field">Don't fill this out if you're human</label>
          <input 
            id="bot-field" 
            name="bot-field" 
            type="text" 
            tabIndex={-1} 
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your email"
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

export default SubscriptionForm;