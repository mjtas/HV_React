import React from 'react';
import { Link } from 'react-router';

import toursImg from '/tours.png';
import groupBuilding from '/groupBuilding.png';
import customWorkshop from '/customWorkshop.png'

const HiddenValley: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
        <title>Private Bookings - Hidden Valley Workshops</title>
        <meta name="description" content="Private booking information for Hidden Valley Workshops"></meta>
        <h1 className="text-4xl md:text-5xl font-light font-serif text-green-600 mb-4">
            Hidden Valley
          </h1>
          <h2 className="text-2xl md:text-3xl font-light font-serif text-gray-700">
            Private Bookings
          </h2>
        </div>
        
        <div className="space-y-16">
          {/* Tours Section */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Tours
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                Hidden Valley is a great destination for sustainable house and garden tours and I can also provide morning tea or lunch featuring home made and home grown produce for your group. I’ll give you an overview of our food production set-up including my no-dig gardens where I grow all of our own veggies and fruit, my composting area, chooks and greenhouse.
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  src={toursImg} 
                  alt="Hidden Valley Garden Design" 
                />
              </div>
            </div>
          </div>

          {/* Team Building Section */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Team Building and Corporate Events
              </h3>
              <div className="text-gray-700 leading-relaxed">
                <p>
                Help bring your team together in a fun and engaging way through the shared experience of making sourdough, pizza, or taking on a small building project as pairs. 
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  src={groupBuilding} 
                  alt="Hidden Valley Team Building" 
                />
              </div>
            </div>
          </div>

          {/* Custom Workshop Section */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Custom Workshops
              </h3>
              <div className="text-gray-700 leading-relaxed">
                <p>
                A workshop of your choice can be arranged at a date and time that suits you.  Have a look at the{" "}
                <Link 
                to="/workshops" 
                className="text-green-600 hover:text-green-800 cursor-pointer gap-3">
                 available topics 
                </Link>{" "}
                and get inspired!
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  src={customWorkshop} 
                  alt="Hidden Valley Custom Workshop" 
                />
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center bg-white rounded-lg shadow-md p-8 mt-16">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Discuss your needs and arrange your next event
              </h3>
              <Link 
                to="/contactUs" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiddenValley;