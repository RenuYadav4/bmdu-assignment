import React from "react";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer overflow-hidden relative">
      <div className="w-full h-36 md:h-40 overflow-hidden rounded-t-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-md md:text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 truncate">{product.category}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <p className="text-black font-bold text-sm md:text-base mt-2">
          $ {product.price}
        </p>
      </div>

      {/* Edit & Delete Buttons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={() => onEdit(product)}
          className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded-md text-xs shadow"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-xs shadow"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
