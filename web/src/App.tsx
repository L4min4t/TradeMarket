import React from "react";
import {Outlet, useLocation} from "react-router-dom";

import GlobalStyles, {FlexContainer} from "./components/GlobalStyles";
import {AuthProvider} from "./context/AuthProvider";

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
    const location = useLocation();
    const noHeaderFooterPaths = ["/login", "/register", "*"];
    const showHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);
    
    
    return (
        <>
            <GlobalStyles></GlobalStyles>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <AuthProvider>
                <FlexContainer flexDirection={"column"}>
                    {showHeaderFooter && <Header />}
                    <Outlet/>
                    {showHeaderFooter && <Footer />}
                </FlexContainer>
            </AuthProvider>
        </>
    );
};
export default App;
