import React from 'react';
// import SearchResultCard from "../cards/SearchResultCard";

export default function SearchResultList({ results, searched }) {
    // useEffect(() => {
    //     console.log('updated results', results)
    // }, [results]);

    function mapResults() {
        if (results.length > 0) {
            return (
                results.map(result => {
                    const { title, s2Url } = result._source
                    const paperAbstract = result._source.paperAbstract.substring(0, 200) + "..."
                    const fieldsOfStudy = result._source.fieldsOfStudy

                    return (
                        <div className="bg-white rounded px-4 py-4" key={result.id}>
                            <h4 className="text-blue-600 no-underline hover:underline">
                                <a href={s2Url}>{title}</a>
                            </h4>
                            <div className="flex">
                                {
                                    fieldsOfStudy.length >= 1 ? fieldsOfStudy.map(field => <div className="border border-transparent text-base font-medium rounded-md bg-blue-900 text-white px-2 py-1 mr-2"><h6>{field}</h6></div>) 
                                    : <div></div>
                                }
                            </div>
                            {
                                paperAbstract.length === 3 ? <p>No abstract found</p> : <p>{paperAbstract}</p>
                            }
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