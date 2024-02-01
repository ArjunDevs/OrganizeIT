import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/auth/Auth";
import { Home } from "./pages/home/Home";
import { DashBoard } from "./pages/dashboard/DashBoard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<DashBoard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
