import React from 'react';
import AssumedKnowledge from './assumed-knowledge';
import ToolsMaterials from './tools-materials';
import CuttingList from './cutting-list';
import NumberedSteps from './numbered-steps';
import type { Guide } from '../types/guide';

interface SelectedGuideComponentProps {
  guide: Guide;
}

const SelectedGuideComponent: React.FC<SelectedGuideComponentProps> = ({ guide }) => {
  const isBuilding = guide.type === 'building';

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">{guide.title}</h3>
      <h4 className="text-xl font-semibold text-gray-600">
        Difficulty Level: {guide.rating}
      </h4>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <img 
          className="w-full max-w-md mx-auto rounded-lg shadow-md transition-transform duration-300 hover:scale-105" 
          src={`/${guide.image}.png`} 
          alt={guide.title}
        />
      </div>
      
      {isBuilding && (
        <div className="bg-green-50 p-4 rounded-lg">
          <AssumedKnowledge />
        </div>
      )}
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <p className="text-gray-700 leading-relaxed">{guide.introText}</p>
      </div>
      
      <ToolsMaterials guide={guide} />
      
      {guide.cuttingString && (
        <CuttingList guide={guide} />
      )}
      
      <NumberedSteps guide={guide} />
      
      {guide.concText && (
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-gray-700 leading-relaxed">{guide.concText}</p>
        </div>
      )}
    </div>
  );
};

export default SelectedGuideComponent;