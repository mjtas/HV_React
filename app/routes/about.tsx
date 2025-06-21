import React from 'react';
import aboutImage from '/about.png';
import hiddenValleyImage from '/hiddenValley.png';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
        <title>About - Hidden Valley Workshops</title>
        <meta name="description" content="More information about Hidden Valley Workshops"></meta>
          <h1 className="text-4xl md:text-5xl font-light font-serif text-green-600 mb-4">
            Hidden Valley
          </h1>
          <h2 className="text-2xl md:text-3xl font-light font-serif text-gray-700">
            About Us
          </h2>
        </div>
        
        <div className="space-y-16">
          {/* First Block - About Bonnie */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <ul className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <li>
                  Hi, I'm Bonnie Bickel and I run sustainable living workshops on my large stunning property 20 minutes outside of Deloraine in central northern Tasmania. I decided to focus my life around producing my own food and doing things for myself about 15 years ago, and in that time I have learnt a lot!
                </li>
                <li>
                  A healthy diet is one consisting mainly of fruit and vegetables, and I have learnt to focus on growing all the fruit and vegetables my family needs in the most efficient way possible. I also do all kinds of building projects around the home which improves the quality of our lives, such as building a play-set and mud kitchen for the kids. I also bake artisan sourdough bread, which is much cheaper and healthier than buying bread and gives us so much joy.
                </li>
                <li>
                  When I'm not doing things around the place, I'm in front of the fire researching my topics of interest and planning for the future. I am so passionate about this way of life I've found and excited to be part of helping others live happy, joyful and meaningful lives around the home.
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" 
                  src={aboutImage} 
                  alt="Bonnie Bickel at Hidden Valley"
                />
              </div>
            </div>
          </div>

          {/* Second Block - About Hidden Valley */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About Hidden Valley
              </h2>
              <ul className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <li>
                  Hidden Valley is a private 280 acre property bordering the Great Western Tiers Conservation Area. It has spectacular views and lies 750 metres above sea level just past the Liffey Falls turn off on Highland Lakes Road. Only 20 minutes from Deloraine and under an hour from Launceston or Devonport, it is an old grazing property with paddocks dominated by native grasses and large areas of rainforest. There are two creeks that run over the property, a waterfall, and a sandstone cave.
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" 
                  src={hiddenValleyImage} 
                  alt="Hidden Valley landscape"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;