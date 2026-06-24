import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/users/register`,
                {
                    name,
                    email,
                    password,
                    confirmPassword
                }
            )

            if (response.data.success) {
                setSuccess("Registration successful");

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);
            }

            console.log(response.data);
        }
        catch (error) {
            setError(error.response.data.message);
        }
    }

    return (
        <div
            className='min-h-screen flex justify-center items-center bg-gray-200'
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
                <h1
                    className='text-xl font-bold text-gray-700 text-center mb-5'
                >
                    Register Page
                </h1>

                {
                    success && (
                        <p
                            className="text-green-600 text-center mb-4"
                        >
                            {success}
                        </p>
                    )
                }

                {
                    error &&
                    <p
                        className='text-sm text-red-500 font-semibold mb-4'
                    >
                        *{error}
                    </p>
                }

                <form
                    onSubmit={handleSubmit}
                >
                    <div
                        className='flex flex-col gap-4'
                    >
                        <input
                            type="text"
                            placeholder='Enter your name'
                            className='px-4 py-2 border-2 rounded-md'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder='Enter your email'
                            className='px-4 py-2 border-2 rounded-md'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder='Enter your Password'
                            className='px-4 py-2 border-2 rounded-md'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder='Re-enter your Password'
                            className='px-4 py-2 border-2 rounded-md'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <button
                            type="submit"
                            className='w-full py-1 bg-blue-600 text-white rounded-sm'
                        >
                            Submit
                        </button>
                    </div>

                    <div
                        className='mt-3 flex gap-5'
                    >
                        <p
                            className='text-gray-700'
                        >
                            Already have an account?
                        </p>

                        <Link
                            to="/login"
                            className='text-gray-700 underline decoration-2 decoration-gray-700'
                        >
                            Login
                        </Link>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register