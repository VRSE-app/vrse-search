import React, { useState } from "react";

import SearchResultList from "./SearchResultList";
import SearchVisualResult from "./SearchVisualResult";

const SearchResultsParent = ({ results, searched }) => {
    const [visualSearch, setVisualSearch] = useState(true);
    // loading state can be handled from both children components
    return (
        <>
            <div>
                <button
                    className="bg-primary rounded p-2 text-white mr-4"
                    onClick={() => {
                        setVisualSearch(false);
                        console.log("swapped to visual");
                    }}
                >
                    Visual
                </button>
                <button
                    className="bg-primary rounded p-2 text-white mr-4"
                    onClick={() => {
                        setVisualSearch(false);
                        console.log("swapped to list");
                    }}
                >
                    List
                </button>
            </div>

            <div>
                {
                    visualSearch ?
                        <SearchVisualResult
                            results={results}
                            searched={searched}
                        />
                        :
                        <SearchResultList
                            results={results}
                            searched={searched}
                        />
                }
            </div>

        </>
    );
}

export default SearchResultsParent;