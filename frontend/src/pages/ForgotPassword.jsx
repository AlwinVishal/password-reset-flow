import axios from 'axios';
import React, { useState } from 'react';

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/users/forgot-password`,
                { email }
            )

            if (response.data.success) {
                setEmailSent(true);
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
                {
                    emailSent ? (
                        <div
                            className='flex flex-col gap-4'
                        >
                            <p
                                className='text-gray-700'
                            >
                                Password reset link has been sent to your email successfuly
                            </p>
                            <p
                                className='text-gray-700'
                            >
                                Please check your email
                            </p>
                        </div>
                    ) : (

                        <div>

                            <form
                                className='flex flex-col gap-4'
                                onSubmit={handleSubmit}
                            >
                                <h1
                                    className='text-xl font-bold text-gray-700 text-center mb-1'
                                >
                                    Forgot Password
                                </h1>

                                {
                                    error &&
                                    <p
                                        className='text-sm text-red-500 font-semibold mb-2'
                                    >
                                        *{error}
                                    </p>
                                }

                                <input
                                    type="email"
                                    placeholder='Enter your email'
                                    className='px-4 py-2 border-2 rounded-md'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <button
                                    type="submit"
                                    className='w-full py-1 bg-blue-600 text-white rounded-sm'
                                >
                                    Submit
                                </button>

                            </form>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ForgotPassword