import React from "react";

const SubmitButton = ({
    text = "",
    href = "#",
}) => {
    return (
        <button
            type="submit"
            className="submit-btn"
        >
            {text}
        </button>
    )
}

export default SubmitButton;