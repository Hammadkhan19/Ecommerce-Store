import React, { useState, useEffect } from "react";
import ReviewCard from "./Reviews";
import AddReviews from "../ProductDetailComponents/AddReviews";
import { useParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";

const LowerPart = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [visibleReviews, setVisibleReviews] = useState(6);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch reviews");

        const data = await response.json();
        setReviews(data.reviews);
        setIsPending(false);
      } catch (err) {
        setError(err.message);
        setIsPending(false);
      }
    };

    fetchProduct();
  }, [id]);
  const handleNewReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 6);
  };
 
  return (
    <div className="max-w-7xl mx-auto py-3 px-6">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <p className="text-gray-500 mb-6">
        Total Reviews: {reviews.length}
      </p>

      <div className="flex justify-between mb-6">
        <button className="flex items-center text-gray-500 hover:text-black">
          <FaFilter className="mr-2" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reviews.slice(0, visibleReviews).map((review, index) => (
          <ReviewCard
            key={index}
            name={review.username}
            rating={review.rating}
            comment={review.comment}
            date={new Date(review.createdAt).toLocaleDateString()}
          />
        ))}
      </div>

      {visibleReviews < reviews.length && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMoreReviews}
            className="bg-white text-black py-2 px-4 rounded-lg"
          >
            Load More
          </button>
        </div>
      )}
       <AddReviews productId={id} onNewReview={handleNewReview} />
    </div>
  );
};

export default LowerPart;
