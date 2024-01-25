// Shop.js
"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearch,
  setSearchTerm,
  setCategory,
  setPriceFilter,
} from "../redux/searchSlice";
import Book from "./Book";
import { FaMinus } from "react-icons/fa";

const Shop = () => {
  const dispatch = useDispatch();
  const { searchTerm, category } = useSelector(selectSearch);
  const [books, setBooks] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    fetch("bookdata.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClearSearch = () => {
    dispatch(setSearchTerm(""));
  };

  const handleCategoryChange = (e) => {
    // Only dispatch the category change if it's not the "All" category
    if (e.target.value !== "All") {
      dispatch(setCategory(e.target.value));
    } else {
      // If "All" is clicked, clear the category
      dispatch(setCategory(""));
    }
  };

  const handlePriceFilterApply = () => {
    dispatch(setPriceFilter({ min: minPrice, max: maxPrice }));
    setMinPrice(0);
    setMaxPrice(0);
  };

  return (
    <div className="mx-12">
      <div className="flex">
        <div className="flex flex-col p-2 sm:p-4 md:py-8 md:px-8 border-2 border-red-600">
          <div className="flex flex-col items-start">
            <h2 className="text-[16px] sm:text-xl font-bold mb-3">Category</h2>
            <div className="flex justify-center items-center mb-2">
              <input
                type="radio"
                name="category"
                id="all"
                value="All"
                onChange={() => dispatch(setCategory("All"))}
              />

              <label
                htmlFor="all"
                className="ms-1 text-sm sm:text-[16px] font-semibold"
              >
                All
              </label>
            </div>
            {[
              "Mystery and Thriller",
              "Science Fiction and Fantasy",
              "Historical Fiction",
              "Self-Help and Personal Development",
              "Biography and Memoir",
              "Classic Literature",
            ].map((cat) => (
              <div key={cat} className="flex justify-center items-center mb-2">
                <input
                  type="radio"
                  name="category"
                  id={cat}
                  value={cat}
                  checked={category === cat}
                  onChange={handleCategoryChange}
                />
                <label
                  htmlFor={cat}
                  className="ms-1 text-sm sm:text-[16px] font-semibold"
                >
                  {cat}
                </label>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start mt-5">
            <h2 className="text-[16px] sm:text-xl font-bold mb-3">Price</h2>
            <div className="flex justify-center items-center mb-2">
              <input
                type="number"
                name="minPrice"
                placeholder="min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-20 h-10 border-2 border-red-400 ps-1 focus:outline-none"
              />
              <FaMinus className="mx-2" />
              <input
                type="number"
                name="maxPrice"
                placeholder="max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-20 h-10 border-2 border-red-400 me-2 ps-1 focus:outline-none"
              />
              <button
                onClick={handlePriceFilterApply}
                className="add-to-cart bg-orange-500 text-white px-4 py-3 font-semibold rounded-lg text-sm sm:text-[16px]"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 px-2 py-12 border-2 border-red-600">
          <h2 className="text-xl sm:text-3xl font-bold text-center mb-5">
            All Books
          </h2>
          <div className="w-full md:w-[500px] mx-auto mb-8">
            <div className="relative flex items-center w-full h-12 rounded-lg shadow-lg bg-white overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by bookname..."
                value={searchTerm}
                onChange={handleSearch}
                className="outline-none p-3 text-black w-full md:w-[450px]"
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer bg-gradient-to-r from-sky-500 to-indigo-500 add-to-cart text-[16px] rounded-lg font-semibold text-white px-8 py-2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 md:mx-3">
            {books?.map((book) => (
              <Book key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
