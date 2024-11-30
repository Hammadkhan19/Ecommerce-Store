import React, { useState, useEffect, useContext } from "react";
import StarRatings from "react-star-ratings";
import { AuthContext } from "../../context/AuthContext";

const AddReviews = ({ productId, onNewReview }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);
  
  useEffect(() => {
    const fetchReviewStatus = async () => {
      if (user) {
        try {
          const response = await fetch(`http://localhost:3000/reviews/${productId}?userId=${user.userId}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${user.token}` // Include the token in the request headers
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch review status");
          }

          const data = await response.json();
          setHasReviewed(data.hasReviewed);
        } catch (error) {
          console.error("Error fetching review status:", error);
        }
      }
    };
    fetchReviewStatus();
  }, [productId, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.userId === "guest") {
      setMessage("Please log in to add a review.");
   
      return;
    }

    const reviewData = {
      userId: user.userId,
      rating,
      comment,
      productId,
    };

    try {
      const response = await fetch("http://localhost:3000/addreview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();
      if (response.ok) {
        setComment("");
        setRating(0);
        setMessage("Review added successfully");
        onNewReview(reviewData);
      } else {
        setMessage(data.message || "Failed to add review");
      }
    } catch (error) {
      setMessage("Error adding review: " + error.message);
    }
  };

  return (
    <div className="flex items-center max-w-3xl mx-auto p-4">
      <div className="flex-1">
        <h2 className="text-2xl text-center font-semibold mb-4 text-gray-800">
          Add Your Review
        </h2>
        {hasReviewed ? (
          <p className="text-red-600">You have already reviewed this product.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-4">
              <label className="block text-lg mb-2 font-medium text-gray-700">
                Rating
              </label>
              <StarRatings
                rating={rating}
                starRatedColor="yellow"
                starHoverColor="yellow"
                numberOfStars={5}
                name="rating"
                starDimension="30px"
                starSpacing="5px"
                changeRating={(newRating) => setRating(newRating)}
                isSelectable={true}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2 font-medium text-gray-700">
                Detail Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="Write your comment here..."
                required
              />
            </div>
            <button
              type="submit"
              className={`w-fit bg-black text-white font-semibold p-2 rounded-lg shadow hover:bg-black transition duration-200 ${hasReviewed ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={hasReviewed}
            >
              Submit Review
            </button>
          </form>
        )}
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default AddReviews;
