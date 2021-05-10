import React from 'react';
// import SearchResultCard from "../cards/SearchResultCard";

export default function SearchResultList({ results, searched }) {
    // useEffect(() => {
    //     console.log('updated results', results)
    // }, [results]);

    function mapResults() {
        if (results.length > 0) {
            return (
                results.map(image => {
                    const title = image._source.title;
                    const paperAbstract = image._source.paperAbstract.substring(0, 200) + "...";
                    const fieldsOfStudy = image._source.fieldsOfStudy;
                    return (
                        <div className="bg-white rounded px-4 py-4" key={title} >
                            <h4>{title}</h4>
                            {
                                fieldsOfStudy.length ? <div div className="border border-transparent text-base font-medium rounded-md bg-blue-900 text-white px-2 py-1 w-min"><h6>{fieldsOfStudy}</h6></div>
                                    : ""
                            }
                            <p>{paperAbstract}</p>
                        </div >
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
        <div className="flex flex-col gap-4 mt-6 pb-24">
            {mapResults()}
        </div>
    )
}