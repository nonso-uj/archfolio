import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FeatureCard = ({ icon: Icon, title, description }: any) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md duration-200 hover:shadow-lg hover:shadow-white/40 transition-all">
      <Icon size={34} />
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 font-light">{description}</p>
    </div>
  );
};

export default FeatureCard;
