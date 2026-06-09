import { Star } from "lucide-react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 max-w-sm">
      {/* Product Image */}
      <div className="relative bg-gray-50 h-72 overflow-hidden">
        <Link href={`/layout/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full capitalize">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {product.title}
        </h2>

        <p className="text-sm text-gray-500 mt-2 line-clamp-3">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-4">
          <div className="flex items-center text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="ml-1 text-sm font-medium text-gray-700">
              {product.rating.rate}
            </span>
          </div>

          <span className="text-gray-400 text-sm">
            ({product.rating.count} reviews)
          </span>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-5">
          <div>
            <p className="text-2xl font-bold text-gray-900">${product.price}</p>
          </div>

          <button className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
