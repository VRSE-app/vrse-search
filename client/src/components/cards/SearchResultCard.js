import React from 'react';

export default function SearchResultCard( { image }) {
    console.log('image: ', image);

    function renderTags() {
        if (image.tags.length > 0) {
            return image.tags.map(tag => {
                return (
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {tag.title}
                    </span>
                )
            })
        }

        return <div/>
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img 
                className="w-full"
                src={image.urls.full}
                alt={image.alt_description}
            />
            <div className="px-6 pt-4 pb-2">
                { renderTags() }
            </div>
        </div>
    )
}