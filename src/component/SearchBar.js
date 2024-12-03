import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/searchQuery";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchQuery);

  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchBar;
