import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <div>
            <h1>This is home</h1>
            <h5>
                to go to Login page : <Link to="/auth">Click Here</Link>
            </h5>
        </div>
    );
};
