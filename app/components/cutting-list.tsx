import React from 'react';
import type { Guide } from '../types/guide';

interface CuttingListProps {
  guide: Guide;
}

const CuttingList: React.FC<CuttingListProps> = ({ guide }) => {
  const splitItems = (inputString: string): string[] => {
    return inputString ? inputString.split(',').map(item => item.trim()) : [];
  };

  const cuttingItems = splitItems(guide.cuttingString);
  
  const pairedCuttingItems = (): string[][] => {
    const items = cuttingItems;
    const pairs: string[][] = [];
    for (let i = 0; i < items.length; i += 2) {
      pairs.push([items[i], items[i + 1] || '']);
    }
    return pairs;
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="bg-gray-100 px-4 py-3 text-left font-semibold" colSpan={2}>
              Cutting List
            </th>
          </tr>
        </thead>
        <tbody>
          {pairedCuttingItems().map((pair, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="px-6 py-4 text-sm text-gray-900">{pair[0]}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{pair[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CuttingList;