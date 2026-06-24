import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ResetPassword() {

    const { token } = useParams();

    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/users/reset-password`,
                {
                    resetPasswordToken: token,
                    newPassword,
                    confirmNewPassword
                }
            )

            if (response.data.success) {
                setSuccess("Password reset successful");

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }

            console.log(response.data);
        }
        catch (error) {
            setError(error.response.data.message)
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
                    Reset Password
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
                    className='flex flex-col gap-4'
                >
                    <input
                        type="password"
                        placeholder='Enter New Password'
                        className='px-4 py-2 border-2 rounded-md'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder='Re-enter your New Password'
                        className='px-4 py-2 border-2 rounded-md'
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className='w-full py-1 bg-blue-600 text-white rounded-sm'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword