import React, { useEffect } from 'react';
// import SearchResultCard from "../cards/SearchResultCard";

export default function SearchResultList({ results, searched }) {
    useEffect(() => {
        console.log('updated results', results)
    }, [results]);

    function mapResults() {
        if (results.length > 0) {
            return (
                results.map(image => {
                    const title = image._source.title;
                    const paperAbstract = image._source.paperAbstract;
                    const fieldsOfStudy = image._source.fieldsOfStudy;

                    return (
                        <div>
                            <h4>{title}</h4>
                            <h6>{fieldsOfStudy}</h6>
                            <p>{paperAbstract}</p>
                        </div>
                    )
                })
            );
        }

        // if searched and result length is = 0 there are no results
        if (searched) {
            return 'No Results found';
        }
    }

    return (
        <div className="grid grid-cols-3 gap-4 mt-6 mb-24">
            {mapResults()}
        </div>
    )
}