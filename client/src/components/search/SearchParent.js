import React, { useState, useEffect } from "react";
import SearchResult from "./SearchResult";
import useDebounce from "../../hooks/useDebounce";

const sleep = (ms = 500) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

const SearchParent = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedValue = useDebounce(searchTerm, 500);

    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    // const [value, setValue] = useState("");

    useEffect(() => {
        const fetchBooks = async searchTerm => {
            setIsLoading(true);
            const result = await fetch(
                `http://http://server:3000/api/v1/_search`
            );
            const json = await result.json();
            await sleep(800);
            setSearchResults(json);
            setIsLoading(false);
        };
        fetchBooks(debouncedValue);
    }, [debouncedValue]);

    return (
        <div>
            <div>
                <input
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    id="search"
                />
            </div>
            { isLoading && <div>Loading...</div>}

            {!isLoading && (
                <ul>
                    {searchResults.map(book => (
                        <SearchResult
                            key={book.id}
                            value={book.name}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchParent;