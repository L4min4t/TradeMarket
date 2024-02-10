import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import App from "./App";

import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";
import PostersPage from "./pages/Posters";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>

                <Route index element={<PostersPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
