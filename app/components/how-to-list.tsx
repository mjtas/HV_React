import React from 'react';
import HowToSection from './how-to-section';
import type { Guide, GuideType } from '../types/guide';

interface HowToListProps {
  guides: Guide[];
  onGuideSelected: (guideTitle: string) => void;
}

const HowToList: React.FC<HowToListProps> = ({ guides, onGuideSelected }) => {
  const guideTypes: GuideType[] = [
    { value: 'building', name: 'Building' },
    { value: 'chooks', name: 'Chooks' },
    { value: 'compost', name: 'Compost' },
    { value: 'greenhouse', name: 'Greenhouse and Polytunnel Growing' },
    { value: 'berries', name: 'Growing Berries' },
    { value: 'noDig', name: 'No Dig Gardening' },
    { value: 'preserving', name: 'Preserving Fruit and Vegetables' },
    { value: 'pruning', name: 'Pruning and Espalier Fruit Trees' },
    { value: 'sourdough', name: 'Sourdough' }
  ];

  const handleGuideSelected = (guideTitle: string) => {
    onGuideSelected(guideTitle);
  };

  return (
    <div className="space-y-4">
      {guideTypes.map((type, index) => (
        <HowToSection
          key={index}
          guides={guides}
          guideType={type.value}
          guideTypeName={type.name}
          onGuideSelected={handleGuideSelected}
        />
      ))}
    </div>
  );
};

export default HowToList;