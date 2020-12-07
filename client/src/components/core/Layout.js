import React from "react"
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav"
import "@reach/skip-nav/styles.css"
import Nav from "./Nav"
import Footer from "./Footer"
import CookieBanner from "react-cookie-banner"

const Layout = ({ children }) => (
    <div className="bg-gray-100 default-theme">
        <SkipNavLink />
        <Nav />
        <main className="overflow-x-hidden text-gray-800">
            <SkipNavContent />
            {children}
        </main>
        <CookieBanner
            message="This site uses cookies so we can improve the user experience."
            onAccept={() => { }}
            cookie="user-has-accepted-cookies"
            disableStyle={true}
            dismissOnScroll={false}
        />

        <Footer />
    </div>
)

export default Layout
