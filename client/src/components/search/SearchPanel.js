import React from "react"

const SearchPanel = ({title, date, author, keywords, abstract}) => {
    return (
        <div className="min-h-full p-5 bg-white border-2">
            <h3>{title}</h3>
            <p>{date}</p>
            <p>{author}</p>
            
            <div>
                {
                    keywords.map(keyword => {
                        return (
                            <div>
                                <p>{keyword}</p>
                            </div>
                        )
                    })
                }
            </div>
            <p>{abstract}</p>
            {/* could be author bio or other related publications */}
        </div>
    )
}

export default SearchPanel