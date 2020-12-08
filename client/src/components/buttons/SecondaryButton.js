import React from "react";

const SecondaryButton = ({
    text = "",
    href = ""
}) => {
    return (
        <a
            href={href}
            className="secondary-btn"
        >
            {text}
        </a>
    )
}

export default SecondaryButton;