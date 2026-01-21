// src/Components/FeatureIconCard.jsx

import React from "react";
import * as Icon from "react-feather";

const FeatureIconCard = ({ title, iconName, onClick }) => { // Added onClick prop
  const IconComponent = Icon[iconName];

  if (!IconComponent) {
    console.error(`Icon ${iconName} not found in react-feather.`);
    return <FeatureIconCard title={title} iconName="Star" onClick={onClick} />;
  }

  return (
    <div
      onClick={onClick} // Attach the onClick handler here
      className="flex flex-col items-center justify-center p-5 text-center 
                 bg-white rounded-lg shadow-xl 
                 transition-all duration-300 ease-in-out transform 
                 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
    >
      <div className="p-1 bg-gray-100 rounded-xl mb-4">
        <IconComponent size={30} className="text-gray-600" />
      </div>

      <h3 className="text-xl font-semibold text-gray-800 tracking-tight mt-2">
        {title}
      </h3>
    </div>
  );
};

export default FeatureIconCard;