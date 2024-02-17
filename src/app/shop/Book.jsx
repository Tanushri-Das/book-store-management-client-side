// import React from "react";
// import { useSelector } from "react-redux";
// import "./Book.css";

// const Book = ({ book }) => {
//   const { searchTerm, category, priceFilter } = useSelector(
//     (state) => state.search
//   );
//   const { min: minPrice, max: maxPrice } = priceFilter;

//   // Check if the book satisfies visibility criteria
//   const isBookVisible =
//     book.book_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (category === "All" || book.category === category) &&
//     (minPrice === 0 || book.price >= minPrice) &&
//     (maxPrice === 0 || book.price <= maxPrice);

//   if (!isBookVisible) {
//     // If the book should not be visible, return null
//     return null;
//   }

//   return (
//     <div key={book.id} className="product">
//       <img src={book.image} alt={book.book_name} className="product-img" />
//       <div className="mt-5 px-4">
//         <p className="text-[16px] sm:text-xl mb-3 text-center font-semibold">
//           Bookname : {book.book_name}
//         </p>
//         <p className="text-[16px] sm:text-xl mb-3 text-center font-semibold">
//           Writername : {book.writer_name}
//         </p>
//         <p className="text-[16px] sm:text-lg mb-2 text-center font-medium">
//           Price : ${book.price}
//         </p>
//       </div>
//       <div className="mt-20">
//         <div className="btn-div">
//           <button className="add-to-cart bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-6 py-3 font-semibold rounded-lg text-[16px] sm:text-lg">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Book;

// Book.js
"use client";
import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Book.css";
import { addToCart } from "../redux/cartSlice";
import { AuthContext } from "@/Contexts/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Book = ({ book }) => {
  const { user } = useContext(AuthContext);
  const { searchTerm, category, priceFilter } = useSelector(
    (state) => state.search
  );
  const { min: minPrice, max: maxPrice } = priceFilter;
  const dispatch = useDispatch(); // Get the dispatch function

  // Check if the book satisfies visibility criteria
  const isBookVisible =
    book.book_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category === "All" || book.category === category) &&
    (minPrice === 0 || book.price >= minPrice) &&
    (maxPrice === 0 || book.price <= maxPrice);

  // const handleAddToCart = () => {
  //   dispatch(addToCart(book));
  // };

  const handleAddToCart = () => {
    if (user && user.email) {
      const { _id, book_name, price, writer_name, category } = book;

      // Dispatch the addToCart action to update Redux store
      dispatch(addToCart({ _id, book_name, price, writer_name, category }));

      // Prepare payload for the fetch request
      const payload = {
        _id,
        book_name,
        price,
        writer_name,
        category,
        email: user.email,
      };

      // Send the payload in the fetch request
      fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Book added to the cart.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  if (!isBookVisible) {
    // If the book should not be visible, return null
    return null;
  }

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
          <button
            onClick={handleAddToCart} // Call handleAddToCart function when button is clicked
            className="add-to-cart bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-6 py-3 font-semibold rounded-lg text-[16px] sm:text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
