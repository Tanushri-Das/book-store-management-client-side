"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearch, setSearchTerm } from "../redux/searchSlice";
import Book from "./Book";

const Shop = () => {
  const dispatch = useDispatch();
  const { searchTerm, priceFilter } = useSelector(selectSearch);

  const [books, setBooks] = useState([]);

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

  return (
    <div className="my-10 text-center">
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
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 md:mx-4 xl:mx-20">
        {books?.map((book) => (
          <Book book={book} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
