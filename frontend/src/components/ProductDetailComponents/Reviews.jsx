import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';

const ReviewCard = ({ name, rating, comment, date }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <div className="flex items-center mb-2">
        <div className="flex text-yellow-500">
          {/* Render stars based on the rating */}
          {Array.from({ length: 5 }, (_, index) => (
            <FaStar key={index} className={index < rating ? 'filled' : 'empty'} />
          ))}
        </div>
        <div className="flex items-center text-gray-500 ml-2">
          <FaCheckCircle className="text-green-500" />
          <span className="ml-1">Verified</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">{comment}</p>
      <p className="text-gray-500 text-sm mt-2">{date}</p>
    </div>
  );
};

export default ReviewCard;
