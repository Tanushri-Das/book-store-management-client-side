import React from "react";
import { useSelector } from "react-redux";
import "./Book.css";

const Book = ({ book }) => {
  const { searchTerm, category } = useSelector((state) => state.search);

  // Check if the book's name includes the search term
  const isBookVisible =
    book.book_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category === "All" || book.category === category);

  if (!isBookVisible) {
    // If the book should not be visible, return null
    return null;
  }

  // The rest of your Book component remains the same
  return (
    <div key={book.id} className="product">
      <img src={book.image} alt={book.book_name} className="product-img" />
      <div className="mt-5 px-4">
        <p className="text-[16px] sm:text-xl mb-3 text-center font-semibold">
          Bookname : {book.book_name}
        </p>
        <p className="text-[16px] sm:text-xl mb-3 text-center font-semibold">
          Writername : {book.writer_name}
        </p>
        <p className="text-[16px] sm:text-lg mb-2 text-center font-medium">
          Price : ${book.price}
        </p>
      </div>
      <div className="mt-20">
        <div className="btn-div">
          <button className="add-to-cart bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-6 py-3 font-semibold rounded-lg text-[16px] sm:text-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
