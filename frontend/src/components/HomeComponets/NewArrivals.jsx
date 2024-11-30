import Card from "./Cards";
import { Button } from "@nextui-org/react";
const NewArrivals = ({heading}) => {
  return (
    <section className="my-10 px-4">
      <h2 className="text-4xl font-bold text-black mb-8 text-center">
        {heading}
      </h2>
      {/* Product Cards */}
      <div className="flex justify-center justify-items-center  gap-5 md: flex-wrap sm:flex-wrap">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div className="flex justify-center mt-8">
        <Button
          as="a"
          href="#"
          className="bg-white text-black border-2 border-black px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          View All
        </Button>
      </div>
    </section>
  );
};

export default NewArrivals;
