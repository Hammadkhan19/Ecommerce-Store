import React, { useRef, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReviewCard from "./ReviewCard";

const HappyCustomers = () => {
  const scrollRef = useRef(null);

  // Scroll functionality for left/right arrows
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Sample data for reviews (replace with fetched data later)
  const reviews = [
    {
      rating: 5,
      name: "Jessica Taylor",
      comment:
        "Absolutely loved my shopping experience! The quality of the products exceeded my expectations.",
    },
    {
      rating: 4,
      name: "Michael Johnson",
      comment:
        "Great quality! The delivery was a bit slow, but the items were worth the wait.",
    },
    {
      rating: 5,
      name: "Emily Davis",
      comment:
        "I highly recommend this store! The customer service was exceptional and very helpful.",
    },
    {
      rating: 5,
      name: "Daniel Martinez",
      comment:
        "I loved the unique styles available! Will definitely be coming back for more.",
    },
    {
      rating: 5,
      name: "Sarah Wilson",
      comment:
        "Fantastic service! I received my order quickly and everything was perfect.",
    },
    {
      rating: 4,
      name: "David Brown",
      comment:
        "Amazing quality and selection! I found exactly what I was looking for.",
    },
    {
      rating: 5,
      name: "Linda Garcia",
      comment:
        "The products are of high quality! I’ve already recommended this shop to my friends.",
    },
    {
      rating: 5,
      name: "James Rodriguez",
      comment:
        "A wonderful experience from start to finish! I’ll be a loyal customer.",
    },
  ];

  // Autoplay function
  useEffect(() => {
    const interval = setInterval(() => {
      scroll("right");
    }, 3000); // Change the interval time (3000ms = 3 seconds) as needed

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  return (
    <div className="w-full mt-12 p-8">
      {/* Heading */}
      <h2 className="text-2xl lg:text-4xl font-bold text-center mb-6 text-black">
        Happy Customers
      </h2>

      <div className="relative flex items-center  ">
        {/* Left Arrow */}
        <button
          className="absolute left-0 bg-white p-2 rounded-full shadow-md z-10"
          onClick={() => scroll("left")}
        >
          <FaArrowLeft />
        </button>

        {/* Reviews Container */}
        <div
          className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide"
          ref={scrollRef}
        >
          {/* Review Cards */}
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              rating={review.rating}
              name={review.name}
              comment={review.comment}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-0 bg-white p-2 rounded-full shadow-md z-10"
          onClick={() => scroll("right")}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default HappyCustomers;
