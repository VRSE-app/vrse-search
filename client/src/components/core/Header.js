import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';

import SmoothCollapse from "react-smooth-collapse";
import logo from "../../assets/images/logo.svg";
import favicon from "../../assets/images/favicon.svg";

import NavLinks from "../../assets/data/navLinks.json";
import UserNavLinks from "../../assets/data/userNavLinks.json";

function useOutsideAlerter(ref, fn) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                fn(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, fn]);
}

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
                                    {/* <Link href="#" className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-teal-900 focus:outline-none focus:text-white focus:bg-teal-700 transition duration-150 ease-in-out">Dashboard</Link> */}
                                    {
                                        NavLinks.map((item) => (
                                            <Link
                                                to={item.url}
                                                className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-primary hover:text-white hover:bg-teal-500 focus:outline-none focus:text-white focus:bg-teal-700 transition duration-150 ease-in-out"
                                                key={item.label}
                                            >
                                                {item.label}
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {/* Profile dropdown */}

                            <div className="ml-3 relative">
                                <div>
                                    <button
                                        className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        id="user-menu"
                                        aria-label="User menu"
                                        aria-haspopup="true"
                                    >
                                        <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                    </button>
                                </div>


                                {/* Profile dropdown panel, show/hide based on dropdown state.

                                Entering: "transition ease-out duration-100"
                                From: "transform opacity-0 scale-95"
                                To: "transform opacity-100 scale-100"
                                Leaving: "transition ease-in duration-75"
                                From: "transform opacity-100 scale-100"
                                To: "transform opacity-0 scale-95" */}
                                {
                                    userMenuOpen &&
                                    (
                                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                                            <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                                {
                                                    UserNavLinks.map((item) => (
                                                        <Link
                                                            to={item.url}
                                                            className="block px-4 py-2 text-sm leading-5 text-teal-700 hover:bg-teal-100 focus:outline-none focus:bg-teal-100 transition duration-150 ease-in-out"
                                                            role="menuitem"
                                                            key={item.label}
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )
                                }
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
                                        className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-teal-300 hover:text-white hover:bg-teal-700 focus:outline-none focus:text-white focus:bg-teal-700 transition duration-150 ease-in-out"
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