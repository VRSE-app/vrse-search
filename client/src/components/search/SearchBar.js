import React from "react";

export default function SearchBar({ searchTerm, handleChange, handleSearch }) {
    return (
        <form onSubmit={handleSearch} className="w-full mb-8 px-4">
            <div className="flex pt-24">
                <input
                    value={searchTerm}
                    onChange={e => handleChange(e.target.value)}
                    className="bg-white border p-3 mr-3 rounded text-gray-600 w-full"
                    placeholder="Explore publications..."
                />
                <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-8 rounded" type="submit">Search</button>
            </div>
        </form>
    );
}