import React from 'react';
import type { Guide } from '../types/guide';

interface NumberedStepsProps {
  guide: Guide;
}

const NumberedSteps: React.FC<NumberedStepsProps> = ({ guide }) => {
  const splitItems = (inputString: string): string[] => {
    return inputString ? inputString.split(',,').map(item => item.trim()) : [];
  };

  const steps = splitItems(guide.numberedSteps);

  return (
    <div>
      <ol className="list-decimal pl-6 space-y-4 mt-4">
        {steps.map((item, index) => (
          <li key={index} className="text-gray-700 leading-relaxed">
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default NumberedSteps;