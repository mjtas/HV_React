import React, { useState } from 'react';

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
    
    if (!formData.email) return;
  
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

export default SubscriptionForm;