import React from "react";
import SubmitButton from "../buttons/SubmitButton";

const SearchBar = ({ searchTerm, handleChange, handleSearch }) => {
    return (
        <form onSubmit={handleSearch} className="w-full mb-8">
            <div className="grid grid-cols-4 gap-4">
                <input
                    value={searchTerm}
                    onChange={e => handleChange(e.target.value)}
                    className="col-span-4 sm:col-span-3 bg-white border p-3 mr-3 rounded text-gray-600 w-full"
                    placeholder="Explore publications..."
                />
                <a type="submit" className="submit-btn" href={`/search?${searchTerm}`}>Search</a>
            </div>
        </form>
    );
}

export default SearchBar;