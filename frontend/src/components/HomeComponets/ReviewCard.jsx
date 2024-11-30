import React from "react";
import { FaStar } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const ReviewCard = ({ rating, name, comment }) => {
  return (
    <div className="flex-none  w-72 p-4  bg-white rounded-lg shadow-md">
      <div className="flex mb-2">
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar
            key={index}
            className={index < rating ? "text-yellow-500" : "text-gray-300"}
          />
        ))}
      </div>

      {/* Customer Name with Tick Icon */}
      <div className="flex items-center mb-2">
        <FaCheckCircle className="text-green-500 mr-1" />
        <p className="font-semibold">{name}</p>
      </div>

      {/* Comment */}
      <p className="text-sm">{comment}</p>
    </div>
  );
};

export default ReviewCard;
