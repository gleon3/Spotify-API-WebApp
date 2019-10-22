import React, { useState } from "react";

export default function SearchForm({ searchTracks }) {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    searchTracks(query);
  }

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        type="text"
        className="p-2 shadow-lg rounded-l"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search Track/Artist"
        style={{height: "90%"}}
      />
      <button className="text-white px-1 shadow-lg rounded-r" style={{backgroundColor: "#1b1b1b", height: "90%"} }>
        search
      </button>
    </form>
  );
}
