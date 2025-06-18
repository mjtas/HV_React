import React, { useState } from 'react';

const AssumedKnowledge: React.FC = () => {
  const [show, setShow] = useState(false);

  const toggleText = () => {
    setShow(!show);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold cursor-pointer text-green-600 hover:text-green-800" onClick={toggleText}>
        Assumed Knowledge
      </h3>
      {show && (
        <ul className="mt-4 space-y-2">
          <li className="text-gray-700">
            To avoid the plans becoming too wordy, I have assumed some basic building knowledge and skills.
          </li>
          <li className="text-gray-700">
            I assume you know to cut on the waste side of the line, so that you leave the line on when you cut to the measurement.
          </li>
          <li className="text-gray-700">
            I assume you can cut a straight line within 1mm of square with a circular saw (most of the time!).
          </li>
          <li className="text-gray-700">
            I assume you know to always pre-drill your holes 2/3 the depth of the screw.
          </li>
          <li className="text-gray-700">
            I teach all of these skills in my building skills workshops, along with a general introduction to hand and power tools so if you're feeling lost then come along and learn the basics or build on the basics with me in person!
          </li>
        </ul>
      )}
    </div>
  );
};

export default AssumedKnowledge;