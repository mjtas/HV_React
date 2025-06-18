import React from 'react';
import type { Guide } from '../types/guide';

interface ToolsMaterialsProps {
  guide: Guide;
}

const ToolsMaterials: React.FC<ToolsMaterialsProps> = ({ guide }) => {
  const splitItems = (inputString: string): string[] => {
    return inputString ? inputString.split(',').map(item => item.trim()) : [];
  };

  const materialItems = splitItems(guide.materialString);
  const toolItems = splitItems(guide.toolString);
  const maxItemsLength = Math.max(materialItems.length, toolItems.length);

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="bg-gray-100 px-4 py-3 text-left font-semibold">Materials</th>
            <th className="bg-gray-100 px-4 py-3 text-left font-semibold">Tools</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxItemsLength }, (_, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="px-6 py-4 text-sm text-gray-900">
                {materialItems[index] || ''}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {toolItems[index] || ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToolsMaterials;