import React, { useEffect } from 'react';
import SearchResultCard from "../cards/SearchResultCard";

export default function SearchResultList({ results, searched }) {
    useEffect(() => {
        console.log('updated results', results)
    }, [results]);

    function mapResults() {
        if (results.length > 0) {
            return (
                results.map(image => {
                    return (
                        <SearchResultCard
                            image={image}
                            key={image.id}
                        />
                    )
                })
            );
        }

        // if searched and result length is = 0 there are no results
        if (searched) {
            return 'No Results';
        }
    }

    return (
        <div className="grid grid-cols-3 gap-4 mt-6 mb-24">
            {mapResults()}
        </div>
    )
}