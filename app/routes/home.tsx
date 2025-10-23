import React, { useState, useMemo, useEffect } from 'react';
import summerGardenImage from '/summerGarden.png';

// Type definitions
interface Workshop {
  name: string;
  date: string;
  image: string;
  show: boolean;
  text: string;
  link: string;
  type: string;
  time: string;
}

import WorkshopTimetable from '../components/workshop-timetable';

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

// Main component
const HiddenValleyWorkshops: React.FC = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        setLoading(true);
        const response = await fetch('/workshops.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Workshop[] = await response.json();
        setWorkshops(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load workshops');
        console.error('Error loading workshops:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWorkshops();
  }, []);

  // Sort workshops
  const sortedWorkshops = useMemo(() => {
    return [...workshops].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [workshops]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading workshops...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">Error loading workshops: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-green-800 hover:bg-green-900 text-white font-medium py-2 px-4 rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 py-8">
        <title>Home - Hidden Valley Workshops</title>
        <meta name="description" content="Home page for Hidden Valley Workshops"></meta>
          <h1 className="text-4xl md:text-5xl font-serif font-thin text-green-600 mb-4">Hidden Valley</h1>
          <h2 className="text-2xl font-light font-serif text-gray-700 mb-8">Sustainable Living Workshops</h2>
          

          <div className="order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  className="w-full max-h-120 object-bottom md:object-cover transition-transform duration-300 hover:scale-105" 
                  src={summerGardenImage} 
                  alt="Summer Garden at Hidden Valley"
                />
              </div>
            </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div>
                  <WorkshopTimetable 
                    workshops={sortedWorkshops} 
                  />
                </div>
                
                {/* Reviews section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <ul className="space-y-4 text-gray-700">
                    <li className="italic text-lg">
                      "Thanks Bonnie for the wonderful short course on using building tools. Good fun in a beautiful location with a lovely group of participants. Excellent practical teaching to build our confidence!"
                    </li>
                    <li className="text-sm text-gray-500 text-right">- Rebecca</li>
                    <li className="italic text-lg">
                      "This course was amazing. A great mentor, an unspeakably beautiful setting and fabulous hospitality. I would go to another course in a heartbeat."
                    </li>
                    <li className="text-sm text-gray-500 text-right">- Linda</li>
                    <li>
                      <a 
                        href="https://www.google.com/maps/place/Hidden+Valley+Workshops/@-41.6754289,146.7329156,16z/data=!4m8!3m7!1s0xaa7a7f46ea2c43c9:0x17c2d0a271e41b89!8m2!3d-41.6777528!4d146.7364454!9m1!1b1!16s%2Fg%2F11vsg8njlw?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 cursor-pointer"
                      >
                        Read more reviews
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            
            {/* Right side */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <ul className="space-y-4 text-gray-700">
                  <li>
                    Are you looking for inspiration and information to get you started gardening, baking artisan bread, making compost or building?
                  </li>
                  <li>
                    You might want to extend your knowledge and improve your practical skills.
                  </li>
                  <li>
                    Or you might be travelling in Tasmania and looking for an interesting activity to do while you are here.
                  </li>
                  <li>
                    Hidden Valley is only 20 minutes from Deloraine, an hour from Devonport or Launceston, and 2 hours from Hobart on the Great Lakes touring route.
                  </li>
                </ul>
              </div>
              <SubscriptionForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiddenValleyWorkshops;