import React from "react";
import UpperPart from "../components/ProductDetailComponents/UpperPart";
import LowerDetails from "../components/ProductDetailComponents/LowerDetails";
import Divider from "../components/Divider";

const ProductDetails = () => {
  return (
    <div>
      <UpperPart />
      <Divider />
      <LowerDetails />

      <Divider />
    </div>
  );
};

export default ProductDetails;
