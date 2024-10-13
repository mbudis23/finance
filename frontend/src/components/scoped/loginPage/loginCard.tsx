'use client';
import Link from "next/link";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function RegisterCard() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("\u00A0");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("\u00A0");
    
        // Client-side validation (basic example)
        if (formData.password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            setLoading(false);
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', formData, {
                withCredentials: true
            });
            console.log('Login success:', response.data.message);
            setErrorMessage(response.data.message);
            router.push('/');
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Error during login:', error);
                setErrorMessage(error.response?.data?.message || 'Login failed, please try again');
                alert(error.message)
            } else {
                console.error('Unknown error during login:', error);
                setErrorMessage('An unexpected error occurred, please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border-[1px] border-black p-[16px] rounded-[8px] flex flex-col gap-[16px]">
            <h1 className="text-[32px] font-bold text-center">
                Login
            </h1>
            <form className="flex flex-col gap-[8px] min-w-[300px]" onSubmit={handleSubmit}>
                <input
                    className="focus:outline-none focus:shadow-outline w-full px-[16px] py-[4px] rounded-[4px] border-b"
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    className="focus:outline-none focus:shadow-outline w-full px-[16px] py-[4px] rounded-[4px] border-b"
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="bg-black w-full text-white rounded-[4px] px-[16px] py-[4px] hover:underline"
                    disabled={loading}
                >
                    {loading ? "Login..." : "Login"}
                </button>
            </form>
            {errorMessage && (
                <p className='text-red-500 text-center text-[12px]'>
                    {errorMessage}
                </p>
            )}
            <p className='text-black text-center'>
                Dont have an account? <Link className="hover:underline" href={'/register'}>Register</Link>
            </p>
        </div>
    );
}
