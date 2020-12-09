import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';

import SmoothCollapse from "react-smooth-collapse";
import logo from "../../assets/images/logo.svg";
import favicon from "../../assets/images/favicon.svg";

import NavLinks from "../../assets/data/navLinks.json";
import UserNavLinks from "../../assets/data/userNavLinks.json";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef, setMenuOpen);

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (menuOpen || userMenuOpen) {
                setMenuOpen(false);
                setUserMenuOpen(false);
            }
        });
    });

    return (
        <>
            <nav className="bg-white">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-teal-400 hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false"
                            >
                                {
                                    !menuOpen ?
                                        (
                                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        ) :
                                        (
                                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        )
                                }
                            </button>
                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0">
                                {/* there is a separate logo depending on screen size - really clever*/}
                                <Link to="/">
                                    <img className="block lg:hidden h-8 w-auto" src={favicon} alt="VRSE logo" />
                                </Link>
                                <Link to="/">
                                    <img className="hidden lg:block h-8 w-auto" src={logo} alt="VRSE logo" />
                                </Link>
                            </div>
                            {/* non mobile nav */}
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex">
                                    {
                                        NavLinks.map((item) => (
                                            <Link
                                                to={item.url}
                                                className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-secondary hover:text-primary focus:outline-none focus:text-primary transition duration-150 ease-in-out"
                                                key={item.label}
                                            >
                                                {item.label}
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu, toggle classes based on menu state.

                Menu open: "block", Menu closed: "hidden" */}
                <SmoothCollapse expanded={menuOpen} className="">
                    <div className="sm:hidden">
                        <div className="px-2 pt-2 pb-3">
                            {
                                NavLinks.map((item) => (
                                    <Link
                                        to={item.url}
                                        className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-teal-700 focus:outline-none focus:text-primary focus:bg-teal-700 transition duration-150 ease-in-out"
                                        role="menuitem"
                                        key={item.label}
                                    >
                                        {item.label}
                                    </Link>
                                ))
                            }
                            {/* <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-teal-900 focus:outline-none focus:text-white focus:bg-teal-700 transition duration-150 ease-in-out">Dashboard</a> */}
                        </div>
                    </div>
                </SmoothCollapse>
            </nav>
        </>
    )
}

export default Header;