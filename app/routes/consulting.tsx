import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router";

import gardenDesignImg from '/winterPruning.png';
import skillsConsultImg from '/skillsConsult.png';

type PageTitleProps = {
    title: string;
  };
  
  function PageTitle({ title }: PageTitleProps) {
    const location = useLocation();
  
    useEffect(() => {
      document.title = title;
    }, [title, location]);
  
    return null;
  }

const HiddenValley: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
        <title>Consulting - Hidden Valley Workshops</title>
        <meta name="description" content="Consulting information for Hidden Valley Workshops"></meta>
        <h1 className="text-4xl md:text-5xl font-light font-serif text-green-600 mb-4">
            Hidden Valley
          </h1>
          <h2 className="text-2xl md:text-3xl font-light font-serif text-gray-700">
            Garden Design and Practical Skills Consulting
          </h2>
        </div>
        
        <div className="space-y-16">
          {/* Garden Design Section */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Garden Design
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  I have designed many edible gardens including one using permaculture 
                  principles, another one with high raised beds, and here the Hidden Garden 
                  is modelled on a traditional french potager and the Courtyard Garden is a 
                  pure Charles Dowding No Dig design. I also love flowers and have included 
                  many perennials, annuals, climbers and of course roses in my gardens.
                </p>
                <p>
                  Having set up my own 3/4 acre block in Hobart for self-sufficient food 
                  production (including dairy, meat, eggs, fruit and vegetables) I can help 
                  you design your own plan for becoming more self-sufficient. I have learnt 
                  many lessons the hard way and look forward to saving others the money and 
                  heartache involved by helping you plan efficient and sensible systems to 
                  suit your block and lifestyle.
                </p>
                <p>
                  I believe our gardens can be expressions of who we are, they can be works 
                  of art, or they can be all about efficient food production. I'll design 
                  the garden you want and one that will suit your needs.
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  src={gardenDesignImg} 
                  alt="Hidden Valley Garden Design"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Practical Skills Section */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Practical Skills Consulting
              </h3>
              <div className="text-gray-700 leading-relaxed">
                <p>
                  You might want some help pruning your fruit trees. You might want some 
                  building advice on how to build a garden fence, greenhouse, chook house 
                  or any other DIY project you have planned. I'm here to help get you 
                  organised and get you started, whether that means telling you what tools 
                  you need, showing you the skills you need to get the job done, or working 
                  with you until you are confident enough to do it alone.
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  src={skillsConsultImg} 
                  alt="Hidden Valley Skills Consulting"
                  loading="lazy" 
                />
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center bg-white rounded-lg shadow-md p-8 mt-16">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Discuss your needs and arrange an initial site visit ($99 for 90 minutes)
              </h3>
              <Link 
                to="/contactUs" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
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