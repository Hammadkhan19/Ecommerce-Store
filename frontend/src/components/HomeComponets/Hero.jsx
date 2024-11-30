import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="">
      <section class="bg-white py-16 px-8">
        <div class="container mx-auto flex flex-col items-start lg:items-center justify-between lg:flex-row">
          {/* <!-- Left Side: Text, Button, and Stats --> */}
          <div class="lg:w-1/2">
            {/* <!-- Big Heading --> */}
            <h1 class="text-4xl lg:text-5xl font-bold text-black mb-6">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>

            {/* <!-- Small paragraph --> */}
            <p class="text-gray-600 text-lg mb-6">
              Discover a wide range of clothing options from your favorite
              brands, handpicked to fit your unique style.
            </p>

            {/* <!-- Button --> */}
            <div class="flex justify-center md:justify-start">
              <Link to="/products">  <button class="bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition duration-300 mb-10">
                Shop Now
              </button></Link>
             
            </div>
            {/* <!-- Stats Section --> */}
            <div class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
              {/* <!-- Stat 1 --> */}
              <div class="text-center lg:text-left">
                <h2 class="text-2xl font-bold text-black">2000+</h2>
                <p class="text-gray-600">International Brands</p>
              </div>

              {/* <!-- Stat 2 --> */}
              <div class="text-center lg:text-left">
                <h2 class="text-2xl font-bold text-black">3000+</h2>
                <p class="text-gray-600">High Quality Products</p>
              </div>

              {/* <!-- Stat 3 --> */}
              <div class="text-center lg:text-left">
                <h2 class="text-2xl font-bold text-black">40,000+</h2>
                <p class="text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* <!-- Right Side: (Optional for other content or images in future) --> */}
          <div class="lg:w-1/2 hidden lg:flex">
            {/* <!-- Add an image or leave empty if not needed --> */}
          </div>
        </div>
      </section>
      <div class="bg-black w-full h-[50px] sm:h-[60px] flex items-center justify-center">
        <div class="text-white flex space-x-4 sm:space-x-8 md:space-x-12">
          <span class="text-xl sm:text-2xl md:text-3xl font-bold">Nike</span>
          <span class="text-xl sm:text-2xl md:text-3xl font-bold">Adidas</span>
          <span class="text-xl sm:text-2xl md:text-3xl font-bold">Puma</span>
          <span class="text-xl sm:text-2xl md:text-3xl font-bold">Levi's</span>
          <span class="text-xl sm:text-2xl md:text-3xl font-bold">Gucci</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
