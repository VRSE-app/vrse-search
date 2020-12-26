import React from "react";

const SearchResult = (value) => {
    return (
        <li className="item-container">
            <span className="item-text">{value}</span>
        </li>
    )
}

export default SearchResult;