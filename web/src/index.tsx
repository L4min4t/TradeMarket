import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import App from "./App";

import RegisterPage from "./pages/Auth/Register";
import LoginPage from "./pages/Auth/Login";
import NotFound from "./pages/NotFound";
import MainPage from "./pages/Main";
import PosterPage from "./pages/Poster";
import UserPostersPage from "./pages/UserPosters";
import UserPage from "./pages/User";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}>
                <Route index element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/user" element={<UserPage/>}/>
                <Route path="/posters/:id" element={<PosterPage/>}/>
                <Route path="/user-posters/:id" element={<UserPostersPage/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
);
