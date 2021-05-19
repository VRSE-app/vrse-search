import React from "react";
import Header from "../core/Header";
import Footer from "./Footer"
import CookieBanner from "react-cookie-banner"
import "../../styles/global.scss"

const Layout = ({ children }) => (
    <div className="flex flex-col h-screen bg-gray-100 default-theme">
        <Header />
        <main className="flex-grow">
            {children}
        </main>
        <CookieBanner
            message="This site uses cookies so we can improve the user experience."
            onAccept={() => { }}
            cookie="user-accepted-cookies"
            disableStyle={true}
            dismissOnScroll={false}
        />

        <Footer />
    </div>
)

export default Layout
