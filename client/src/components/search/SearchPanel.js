import React from "react"

// more of a sidebar - but it could be moved to the bottom (potentially?)
const SearchPanel = ({node}) => {
    // fieldsOfStudy not currently used
    const { title, abstract, authors, year, s2Url, doiUrl } = node

    const reducer = (accumulator, currentValue) => accumulator + ", " + currentValue.name
    const combinedAuthors = "by " + authors.reduce(reducer, "").substring(1)

    function formatAbstract(input) {
        var text = ""

        if (input.length === 0) {
            text = "No abstract found."
        } else if (input.length > 700) {
            text = input.substring(0,700) + '...'
        } else {
            text = input.substring(0,700)
        }

        return text
    }

    return (
        <div className="min-h-full p-5 bg-white border-l-2">
            <div id="search-panel" style={{ opacity:"0" }}>
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
                <p>{formatAbstract(abstract)}</p>
            </div>
        </div>
    )
}

export default SearchPanel