import React, { useState, useEffect, useMemo } from 'react';

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

interface PriceData {
  type: string;
  singlePrice: string;
  doublePrice: string;
}

const WorkshopDetails: React.FC = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedWorkshops, setExpandedWorkshops] = useState<Set<string>>(new Set());

  // Fetch price data from json
  useEffect(() => {
    const loadPrices = async () => {
      try {
        const response = await fetch('/prices.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PriceData[] = await response.json();
        setPriceData(data);
      } catch (err) {
        console.error('Error loading prices:', err);
        setError(err instanceof Error ? err.message : 'Failed to load prices');
      }
    };

    loadPrices();
  }, []);

  // Fetch workshops data from json
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

  // Filter workshops to include only those within the next 6 months from today's date
  const filteredWorkshops = useMemo(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    const eightMonthsFromToday = new Date();
    eightMonthsFromToday.setMonth(eightMonthsFromToday.getMonth() + 8);
    
    return workshops.filter(workshop => {
      const workshopDate = new Date(workshop.date).setHours(0, 0, 0, 0);
      return workshopDate >= today && workshopDate <= eightMonthsFromToday;
    });
  }, [workshops]);

  // Get other workshops (not in the filtered list)
  const otherWorkshops = useMemo(() => {
    const filteredWorkshopNames = new Set(filteredWorkshops.map(w => w.name));
    return workshops.filter(workshop => !filteredWorkshopNames.has(workshop.name));
  }, [workshops, filteredWorkshops]);

  // Sort workshops
  const sortedWorkshops = useMemo(() => {
    return [...filteredWorkshops].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [workshops]);

  // Format date function
  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  // Calculate single price
  const calcPrice = (type: string): string => {
    const workshopType = priceData.find(price => price.type === type);
    return workshopType?.singlePrice || "N/A";
  };

  // Calculate double price
  const calcDoublePrice = (type: string): string => {
    const workshopType = priceData.find(price => price.type === type);
    return workshopType?.doublePrice || "N/A";
  };

  // Toggle workshop description visibility
  const toggleText = (workshopName: string) => {
    setExpandedWorkshops(prev => {
      const newSet = new Set(prev);
      if (newSet.has(workshopName)) {
        newSet.delete(workshopName);
      } else {
        newSet.add(workshopName);
      }
      return newSet;
    });
  };

  // Handle booking redirect
  const redirectToExternalLink = (workshop: Workshop) => {
    if (workshop?.link) {
      window.open(workshop.link, '_blank', 'noopener,noreferrer');
    } else {
      console.error('Invalid workshop data or link not available.');
    }
  };

  // Workshop card component for upcoming workshops
  const WorkshopCard: React.FC<{ workshop: Workshop }> = ({ workshop }) => {
    const isExpanded = expandedWorkshops.has(workshop.name);
    const showFriendPrice = !['weekend', 'mother'].includes(workshop.type);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 rounded-lg bg-white shadow-lg mb-8">
        {/* Left side - Workshop details */}
        <div className="space-y-4">
          <button
            onClick={() => toggleText(workshop.name)}
            className="text-left w-full group"
          >
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-800 cursor-pointer transition-colors duration-200">
              {workshop.name}
              <span className="ml-2 text-sm text-gray-500">
                {isExpanded ? '▼' : '▶'}
              </span>
            </h3>
          </button>

          {isExpanded && workshop.text && (
            <p className="text-gray-700 leading-relaxed">
              {workshop.text}
            </p>
          )}

          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-800">
              {workshop.time}
            </p>
            
            <div className="text-lg">
              <span className="font-bold text-green-600">
                {loading ? 'Loading...' : calcPrice(workshop.type)}
              </span>
              {showFriendPrice && !loading && (
                <span className="text-gray-600 ml-2">
                  (or bring a friend for {calcDoublePrice(workshop.type)})
                </span>
              )}
            </div>
          </div>

          {/* Booking section */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6 hover:bg-green-100 transition-colors duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-600 font-medium">Next Date:</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatDate(workshop.date)}
                </p>
              </div>
              <button
                onClick={() => redirectToExternalLink(workshop)}
                className="bg-green-600 hover:bg-green-800 cursor-pointer text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 whitespace-nowrap"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Workshop image */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <img
              src={`/${workshop.image}.png`}
              alt={`${workshop.name} workshop`}
              className="w-full h-auto rounded-lg shadow-md object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/hiddenValley.png';
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  // Other workshop card component (simplified, no date or booking)
  const OtherWorkshopCard: React.FC<{ workshop: Workshop }> = ({ workshop }) => {
    const isExpanded = expandedWorkshops.has(workshop.name);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 rounded-lg bg-white shadow-lg mb-8">
        {/* Left side - Workshop details */}
        <div className="space-y-4">
          <button
            onClick={() => toggleText(workshop.name)}
            className="text-left w-full group"
          >
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-800 cursor-pointer transition-colors duration-200">
              {workshop.name}
              <span className="ml-2 text-sm text-gray-500">
                {isExpanded ? '▼' : '▶'}
              </span>
            </h3>
          </button>

          {isExpanded && workshop.text && (
            <p className="text-gray-700 leading-relaxed">
              {workshop.text}
            </p>
          )}
        </div>

        {/* Right side - Workshop image */}
        <div className="flex items-center justify-center">
         {isExpanded && ( <div className="w-full max-w-md">
            <img
              src={`/${workshop.image}.png`}
              alt={`${workshop.name} workshop`}
              className="w-full h-auto rounded-lg shadow-md object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/hiddenValley.png';
              }}
            />
          </div>)}
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grren-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading workshops...</p>
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
            <p className="font-bold">Error loading workshops</p>
            <p>{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-green-800 hover:bg-green-900 cursor-pointer text-white font-medium py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
            Upcoming Workshops
          </h1>
          <p className="text-xl text-gray-600">
            Join us for hands-on learning at Hidden Valley
          </p>
        </div>

        {/* Upcoming Workshops Section */}
        {sortedWorkshops.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No Upcoming Workshops
              </h3>
              <p className="text-gray-600 mb-6">
                There are currently no workshops scheduled. 
                Please check back later for new dates.
              </p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-green-800 hover:bg-green-900 cursor-pointer text-white font-medium py-2 px-4 rounded"
              >
                Refresh
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedWorkshops.map((workshop, index) => (
              <WorkshopCard key={`${workshop.name}-${index}`} workshop={workshop} />
            ))}
          </div>
        )}

        {/* Other Workshops Section */}
        {otherWorkshops.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">
                Other Workshops
              </h2>
              <p className="text-lg text-gray-600">
                Contact us to discuss custom bookings for these workshops
              </p>
            </div>
            
            <div className="space-y-8">
              {otherWorkshops.map((workshop, index) => (
                <OtherWorkshopCard key={`other-${workshop.name}-${index}`} workshop={workshop} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopDetails;