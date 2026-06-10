import ProductCard from "@/components/local/ProductCard";
import React from "react";

const page = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((elem) => {
        return <ProductCard key={elem.id} product={elem} />;
      })}
    </div>
  );
};

export default page;
