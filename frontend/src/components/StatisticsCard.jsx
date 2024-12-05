import React from 'react';

const StatisticsCard = ({ title, value, color }) => {
  return (
    <div className={`${color} p-6 rounded-lg shadow-lg`}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default StatisticsCard;
