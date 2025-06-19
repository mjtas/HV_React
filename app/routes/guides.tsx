import React, { useState, useEffect } from 'react';
import HowToList from '../components/how-to-list';
import SelectedGuideComponent from '../components/selected-guide';
import type { Guide } from '../types/guide';

const Guides: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [selectedGuideTitle, setSelectedGuideTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const howToIntro1 = "I love a good 'how to' guide. But let's face it, a good one can be hard to find! Either they use expensive materials, they use inches (a hassle to convert), or they leave out important details and leave you without any idea of 'how to'!";
  
  const howToIntro2 = "I have been getting things done for myself around the house for a long time now, and I'm finally getting to the point where I feel like I know enough about what I'm doing to share my own 'how to' guides. I have done all of these projects for myself and found them really useful, but in these guides I have stuck to how I completed each one - which is not to say you could find another way or even a better way! I'd love to improve these guides and add more in over time so if you have any suggestions please email me.";
  
  const howToIntro3 = "Each project is rated with a difficulty rating. Easy are quick and easy to accomplish with minimal experience and/or tools. Medium projects require some more experience and time to get it done. For example, medium rated building projects require the basic tool kit I recommend in my building workshops, and I'll assume you also know how to use your tools to measure and cut accurately. Tricky projects are either more time consuming (taking multiple weekends to do) or require more specialised tools or equipment.";

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const response = await fetch('/guides.json');
        if (!response.ok) {
          throw new Error('Failed to fetch guides');
        }
        const data: Guide[] = await response.json();
        setGuides(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching guides:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  const handleGuideSelected = (guideTitle: string) => {
    setSelectedGuideTitle(guideTitle);
    const guide = guides.find(g => g.title === guideTitle);
    setSelectedGuide(guide || null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading guides...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
        <title>How to Guides - Hidden Valley Workshops</title>
        <meta name="description" content="How To Guides by Hidden Valley Workshops"></meta>
          <h1 className="text-4xl md:text-5xl font-light font-serif text-green-600 mb-4">Hidden Valley</h1>
          <h2 className="text-2xl md:text-3xl font-light font-serif text-gray-700">How To Guides</h2>
        </div>
        
        {/* Mobile-first layout: stacked on mobile, sidebar on desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-8 space-y-8 lg:space-y-0">
          {/* Main content area - appears first on mobile, second column on desktop */}
          <div className="order-1 lg:order-2 lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {selectedGuideTitle === '' ? (
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">{howToIntro1}</p>
                  <p className="text-gray-700 leading-relaxed">{howToIntro2}</p>
                  <p className="text-gray-700 leading-relaxed">{howToIntro3}</p>
                </div>
              ) : (
                selectedGuide && <SelectedGuideComponent guide={selectedGuide} />
              )}
            </div>
          </div>
          
          {/* Sidebar - appears second on mobile (full width), first column on desktop */}
          <div className="order-2 lg:order-1 lg:col-span-1">
            <HowToList guides={guides} onGuideSelected={handleGuideSelected} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guides;