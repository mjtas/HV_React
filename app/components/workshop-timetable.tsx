import React, { useMemo } from 'react';

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

interface WorkshopTimetableProps {
  workshops: Workshop[];
}

const WorkshopTimetable: React.FC<WorkshopTimetableProps> = ({ 
  workshops, 
}) => {
  // Filter workshops to include only those within the next 6 months from today's date
  const filteredWorkshops = useMemo(() => {
    const today = new Date().setHours(0, 0, 0, 0); // Get today's date without time
    const eightMonthsFromToday = new Date();
    eightMonthsFromToday.setMonth(eightMonthsFromToday.getMonth() + 8); // Add 8 months to today
    
    return workshops.filter(workshop => {
      const workshopDate = new Date(workshop.date).setHours(0, 0, 0, 0); // Get workshop date without time
      return workshopDate >= today && workshopDate <= eightMonthsFromToday;
    });
  }, [workshops]);

  // Handle booking redirect
  const redirectToExternalLink = (workshop: Workshop) => {
    if (workshop?.link) {
      window.open(workshop.link, '_blank', 'noopener,noreferrer');
    } else {
      console.error('Invalid workshop data or link not available.');
    }
  };

  // Format date function
  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  // Handle workshop selection
  const selectWorkshop = (workshop: Workshop) => {
    redirectToExternalLink(workshop);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Coming up:</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
               <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-min whitespace-nowrap">
                  Date
                </th>
                <th className="px-6 py-3 text-centre text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Workshop
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWorkshops.map((workshop, index) => (
                <tr 
                  key={workshop.name} 
                  className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                >
                  <td className="py-4 whitespace-nowrap text-sm text-gray-900 w-min">
                    {formatDate(workshop.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => selectWorkshop(workshop)}
                      className="text-green-600 hover:text-green-800 hover: cursor-pointer font-medium transition-colors duration-150 text-left"
                    >
                      {workshop.name}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default WorkshopTimetable;