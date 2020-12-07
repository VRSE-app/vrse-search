import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { useWindowSize } from "../../utils/useWindowResize"

const Nav = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const size = useWindowSize();

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false)
        }
    }, [size, menuOpen])

    return (
        <nav className="bg-white text-gray-800">
            <div className="container-lg py-3 flex">
                {/* Logo will go here */}
                <Link to="/">
                    <h1 className="text-2xl my-0">VRSE</h1>
                </Link>
            </div>
        </nav>
    )
}

export default Nav
