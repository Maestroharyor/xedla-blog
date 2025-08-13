"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchFormProps {
  initialQuery?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ initialQuery = "" }) => {
  const [searchText, setSearchText] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = () => {
    if (searchText.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchText.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="relative">
        <label htmlFor="Search" className="sr-only">
          Search
        </label>

        <input
          type="text"
          id="Search"
          placeholder="Search for..."
          value={searchText}
          className="w-full rounded-md dark:bg-gray-700 border-gray-200 ring-4 outline-none focus:ring-secondary-50 py-5 px-3 pe-10 shadow-sm sm:text-sm"
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button
            type="button"
            onClick={handleSearch}
            className="text-gray-600 hover:text-gray-700"
          >
            <span className="sr-only">Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>
      </div>
    </div>
  );
};

export default SearchForm;
