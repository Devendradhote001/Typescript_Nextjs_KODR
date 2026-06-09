import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex gap-5 font-semibold">
      <Link href={"/mainlayout/home"}>Home</Link>
      <Link href={"/mainlayout/contact"}>contact</Link>
      <Link href={"/mainlayout/product"}>Product</Link>
    </div>
  );
};

export default Navbar;
