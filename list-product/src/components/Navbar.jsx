import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex gap-5 text-xl font-semibold">
      <Link href={"/layout/home"}>Home</Link>
      <Link href={"/layout/products"}>Products</Link>
    </div>
  );
};

export default Navbar;
