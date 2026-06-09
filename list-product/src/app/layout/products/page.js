import ProductCard from "@/components/ProductCard";
import React from "react";

const page = async () => {
  let response = await fetch("https://fakestoreapi.com/products");
  let products = await response.json();
  console.log(products);

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((elem) => {
        return <ProductCard product={elem} />;
      })}
    </div>
  );
};

export default page;
