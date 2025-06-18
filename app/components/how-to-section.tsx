import React from 'react';
import type { Guide } from '../types/guide';

interface HowToSectionProps {
  guides: Guide[];
  guideType: string;
  guideTypeName: string;
  onGuideSelected: (guideTitle: string) => void;
}

const HowToSection: React.FC<HowToSectionProps> = ({ 
  guides, 
  guideType, 
  guideTypeName, 
  onGuideSelected 
}) => {
  const filteredGuides = guides.filter(guide => guide.type === guideType);

  const selectGuide = (guideTitle: string) => {
    onGuideSelected(guideTitle);
  };

  return (
    <table className="min-w-full divide-y divide-gray-200 shadow-md">
      <thead>
        <tr>
          <th className="bg-gray-100 px-4 py-3 text-left font-semibold">
            {guideTypeName}
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredGuides.map((guide, index) => (
          <tr key={index} className="hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
            <td className="px-6 py-4 text-sm text-gray-900">
              <button
                onClick={() => selectGuide(guide.title)}
                className="text-green-600 hover:text-green-800 hover: cursor-pointer font-medium transition-colors duration-150 text-left"
              >
                {guide.title}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HowToSection;