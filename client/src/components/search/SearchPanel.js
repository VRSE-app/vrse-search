import React from "react"

// more of a sidebar - but it could be moved to the bottom (potentially?)
const SearchPanel = ({node}) => {
    // fieldsOfStudy not currently used
    const { title, abstract, authors, year, s2Url, doiUrl } = node

    const reducer = (accumulator, currentValue) => accumulator + ", " + currentValue.name
    const combinedAuthors = "by " + authors.reduce(reducer, "").substring(1)

    return (
        <div className="min-h-full p-5 bg-white border-2">
            <h4>{title}</h4>
            <div className="flex">
                <div className="flex-1">
                    { s2Url && <p className="font-bold cursor-pointer"><a href={s2Url}>s2Url</a></p>}
                </div>
                <div className="flex-1">
                    { doiUrl && <p className="font-bold cursor-pointer"><a href={doiUrl}>doiUrl</a></p>}
                </div>
            </div>
            <p>{year}</p>
            <p>{combinedAuthors}</p>
            <p>{abstract.substring(0,400) + '...'}</p>
            {/* could be author bio or other related publications */}
        </div>
    )
}

export default SearchPanel