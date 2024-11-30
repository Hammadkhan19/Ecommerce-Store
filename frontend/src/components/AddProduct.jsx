import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from "@nextui-org/react";
import { FaArrowDown } from "react-icons/fa";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState("");
  const [colors, setColors] = useState("");
  const [category, setCategory] = useState({ _id: "", name: "" });
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append(
      "sizes",
      JSON.stringify(sizes.split(",").map((size) => size.trim()))
    );
    formData.append(
      "colors",
      JSON.stringify(colors.split(",").map((color) => color.trim()))
    );

    formData.append("price", price);
    formData.append("category", category._id);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3000/addproduct", {
        method: "POST",
        headers: {
          Authorization: `Bearer your_jwt_token_here`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setTitle("");
        setDescription("");
        setPrice("");
        setColors("");
        setSizes("");
        setCategory({ _id: "", name: "" });
        setImage(null);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error creating product: " + error.message);
    }
  };

  // Fetching categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsPending(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Product</h2>
      {message && <p className="mb-4 text-red-500 text-center">{message}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Title input */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* Colors input */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">
            Colors
          </label>
          <input
            type="text"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* Sizes input */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">
            Sizes
          </label>
          <input
            type="text"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* Description input */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* Price input */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* Categories dropdown */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">Category</label>
          <Dropdown>
            <DropdownTrigger>
              <Button
                disableRipple
                className="w-2/3 p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<FaArrowDown />}
                radius="sm"
                variant="light"
              >
                {category.name || "Select a category"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Shop features" className="w-full">
              {isPending && <DropdownItem>Loading categories...</DropdownItem>}
              {error && <DropdownItem>Error loading categories</DropdownItem>}
              {!isPending &&
                !error &&
                categories.map((cat) => (
                  <DropdownItem
                    key={cat._id}
                    onClick={() =>
                      setCategory({ _id: cat._id, name: cat.name })
                    }
                  >
                    {cat.name}
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        {/* Image input */}
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-2/3"
            required
          />
        </div>
        {/* Submit button */}
        <div className="col-span-2 flex justify-center">
          <button
            type="submit"
            className="w-1/3 p-2 bg-black text-white rounded hover:bg-slate-950"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
