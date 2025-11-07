// src/Components/FeatureIconCard.jsx

import React from "react";
import * as Icon from "react-feather"; // Import all icons from react-feather

/**
 * A reusable card for displaying a feature with an icon, title, and optional description.
 */
const FeatureIconCard = ({ title, iconName }) => {
  // Dynamically get the icon component based on the string name passed in props
  const IconComponent = Icon[iconName];

  // If the icon doesn't exist, use a default icon (e.g., Star)
  if (!IconComponent) {
    console.error(`Icon ${iconName} not found in react-feather.`);
    return <FeatureIconCard title={title} iconName="Star" />;
  }

  return (
    // Card container: Flex, centered content, white background, rounded, shadow, and hover effect
    <div
      className="flex flex-col items-center justify-center p-5 text-center 
                 bg-white rounded-lg shadow-xl 
                 transition-all duration-300 ease-in-out transform 
                 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
    >
      {/* Icon Container: Large, light gray background, slightly rounded */}
      <div className="p-1 bg-gray-100 rounded-xl mb-4">
        {/* Icon: Size and color matching the professional look */}
        <IconComponent size={30} className="text-gray-600" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 tracking-tight mt-2">
        {title}
      </h3>
    </div>
  );
};

export default FeatureIconCard;
