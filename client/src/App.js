import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/auth/Auth";
import { Home } from "./pages/home/Home";
import { DashBoard } from "./pages/dashboard/DashBoard";
import { Board } from "./pages/Board/Board";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/:userId/Board/:boardId" element={<Board />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
