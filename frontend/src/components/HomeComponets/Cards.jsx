import React from "react";
import { Card, CardBody, Image } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";

const Cards = ({ name, price, image, rating,  }) => {
  const roundedRating = Math.round(rating); // Round the rating to the nearest whole number

  return (
    <div className="">
      <Card
        isPressable
        isHoverable
        className="transition-none hover:scale-100 shadow-none"
      >
        <CardBody className="p-4">
          <Image
            src={`http://localhost:3000/uploads/${image}`}
            alt={name}
            className="rounded-lg flex justify-center"
          />
          <h3 className="font-semibold mt-2">{name}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center mt-1"></div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Cards;
