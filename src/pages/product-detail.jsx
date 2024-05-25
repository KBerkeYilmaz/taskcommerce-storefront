import React from "react";
import { useParams } from "react-router-dom";
import { dummyData } from "../server/db/dummy";

const ProductDetail = () => {
  const { category, id } = useParams();
  const product = dummyData.products.find(
    (item) => item.id === id && item.category === category
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetail;
