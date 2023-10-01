import React, { useState } from "react";

const SearchBar = ({
  setSubmittedSearch,
}: {
  setSubmittedSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [searchText, setSearchText] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchText) {
      setHasError(true);
      return;
    }

    setHasError(false);
    setSubmittedSearch(searchText);
    setSearchText("");
  };

  return (
    <form onSubmit={handleSubmit} className="px-5 flex items-center gap-2">
      <input
        id="user"
        className={`border-[1px] p-2 rounded-lg w-[70%] ${
          hasError ? "border-red-500" : "border-slate-500"
        } lg:w-[30%]`}
        placeholder="Search user"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        type="submit"
        className="border-none bg-blue-500 text-white rounded-lg w-[30%] lg:w-auto"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
