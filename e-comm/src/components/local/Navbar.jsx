import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <div className="flex gap-5 justify-between items-center">
      <h1 className="text-xl font-bold">E-comm</h1>

      <div className="flex gap-5 text-xl">
        <Link href={"/main/home"}>Home</Link>
        <Link href={"/main/products"}>Products</Link>
      </div>

      <ModeToggle />
    </div>
  );
};

export default Navbar;
