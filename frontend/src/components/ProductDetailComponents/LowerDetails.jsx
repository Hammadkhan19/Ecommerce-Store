import React, { useState } from 'react';
import ProductDetails from './ProductDetails';
import FAQs from './FAQS';
import LowerPart from './LowerPart'; // Importing the reviews component
import { useParams } from "react-router-dom";
const  LowerDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('reviews');
 
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'productDetails':
        return <ProductDetails />;
      case 'faqs':
        return <FAQs />;
      default:
        return <LowerPart productId={id} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      {/* Tab Buttons */}
      <div className="flex justify-center mb-6">
        <button
          className={`py-2 px-4 ${activeTab === 'reviews' ? 'bg-black text-white' : 'bg-gray-200 text-black'} rounded-lg mr-2`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'productDetails' ? 'bg-black text-white' : 'bg-gray-200 text-black'} rounded-lg mr-2`}
          onClick={() => setActiveTab('productDetails')}
        >
          Product Details
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'faqs' ? 'bg-black text-white' : 'bg-gray-200 text-black'} rounded-lg`}
          onClick={() => setActiveTab('faqs')}
        >
          FAQs
        </button>
      </div>

      {/* Render Active Tab Content */}
      {renderActiveTab()}
    </div>
  );
};

export default LowerDetails;
