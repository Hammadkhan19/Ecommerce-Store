import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";

const TopSelling = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // Handle errors

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data.slice(0, 5)); // Limit to the first 5 products
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts(); // Fetch the products
  }, []);

  // Function to calculate average rating
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  return (
    <section className="my-10 px-4">
      <h2 className="text-4xl font-bold text-black mb-8 text-center">
        Top Selling
      </h2>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {products.map((product) => {
            const averageRating = calculateAverageRating(product.reviews);
            const reviewCount = product.reviews ? product.reviews.length : 0;

            return (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="flex-shrink-0 snap-center"
              >
                <Card
                  isPressable
                  isHoverable
                  className="transition-none hover:scale-105 shadow-md w-64"
                >
                  <CardBody>
                    <Image
                      src={`http://localhost:3000/uploads/${product.image}`} // Full image URL
                      alt={product.title}
                      className="rounded-lg w-full h-48 object-cover"
                    />
                    <h3 className="font-semibold mt-2">{product.title}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < Math.round(averageRating)
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        ({reviewCount} reviews)
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      ${product.price}
                    </p>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Link to={"/products"}>
          <Button className="bg-white text-black border-2 border-black px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300">
            View All
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default TopSelling;
