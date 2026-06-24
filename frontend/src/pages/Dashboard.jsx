import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">

                <h1 className="text-2xl font-bold text-gray-700 mb-4">
                    Welcome
                </h1>

                <p className="text-gray-600 mb-6">
                    You have successfully logged in.
                </p>

                <button
                    onClick={handleLogout}
                    className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                    Logout
                </button>

            </div>
        </div>
    );
}

export default Dashboard;