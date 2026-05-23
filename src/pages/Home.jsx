import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="hero min-h-[80vh] bg-base-100">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Build a Winning Resume</h1>
                    <p className="py-6">
                        Use our AI-powered tool to create a professional, ATS-friendly resume in minutes.
                    </p>
                    <Link to="/generate-resume" className="btn btn-primary">Get Started</Link>
                </div>
            </div>
        </div>
    );
}
export default Home;