import React from "react";

const PrimaryButton = ({
    text = "",
    href = "#",
}) => {
    return (
        <a
            href={href}
            className="primary-btn"
        >
            {text}
        </a>
    )
}

export default PrimaryButton;