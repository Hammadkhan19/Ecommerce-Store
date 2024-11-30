import React from "react";
import { Image1, Image2, Image3, Image4 } from "../../assets";

const PictureGallery = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg ms shadow-md max-w-4xl mx-auto mt-8">
      <h1 className="text-xl lg:text-4xl font-bold text-center mb-6 text-black">
        Browse by Dress Style
      </h1>

      <div className="space-y-6">
        {/* First Row */}
        <div className="flex space-x-4">
          <div className="flex-1 h-32 relative">
            <img
              src={Image1}
              alt="Picture 1"
              className="object-bottom h-full w-full rounded-lg"
            />
             <h2 className="absolute top-2 left-2 text-black font-bold text-lg  px-2 py-1 rounded">
              CASUAL
            </h2>
          </div>

          <div className="flex-1 h-32 relative">
            <img
              src={Image4}
              alt="Picture 2"
              className="object-bottom h-full w-full rounded-lg"
            />
              <h2 className="absolute top-2 left-2 text-black font-bold text-lg  px-2 py-1 rounded">
              FORMAL
            </h2>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex space-x-4">
          <div className="flex-1 h-32 relative">
            <img
              src={Image3}
              alt="Picture 3"
              className="object-bottom h-full w-full rounded-lg"
            />
              <h2 className="absolute top-2 left-2 text-black font-bold text-lg  px-2 py-1 rounded">
              PARTY
            </h2>
          </div>

          <div className="flex-1 h-32 relative">
            <img
              src={Image2}
              alt="Picture 4"
              className="object-cover h-full w-full rounded-lg"
            />
            <h2 className="absolute top-2 left-2 text-black font-bold text-lg  px-2 py-1 rounded">
              GYM
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureGallery;
