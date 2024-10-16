'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface EditAccountsCardProps {
    _id:string,
    name:string,
    initial_balance:number,
    closeFunction: () => void;
}

const EditAccountsCard: React.FC<EditAccountsCardProps> = ({ _id, name, initial_balance, closeFunction }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        id: _id,
        name: name,
        initial_balance: initial_balance,
    });
    const [errorMessage, setErrorMessage] = useState("\u00A0");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };
    const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token'))
            ?.split('=')[1];
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("\u00A0");
    
        try {
    
            console.log("Token:", token);  // Log the token
            console.log("Form Data:", formData);  // Log form data
    
            const response = await axios.post('http://localhost:5000/api/accounts/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Addition success:', response.data.message);
            setErrorMessage(response.data.message);
            closeFunction(); 
            router.refresh();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Error during account creation:', error.response ? error.response.data : error.message);
                setErrorMessage(error.response?.data?.message || 'Failed to create account, please try again');
                alert(error.message)
            } else {
                console.error('Unknown error during account creation:', error);
                setErrorMessage('An unexpected error occurred, please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="absolute w-full h-screen top-0 left-0 z-[999] flex items-center justify-center">
            <div className="h-screen w-full blur-lg" />
            <div className="absolute border-[1px] border-black p-[16px] rounded-[8px] flex flex-col gap-[16px] bg-white">
                <div className="w-full justify-end flex text-[16px]">
                    <button onClick={() => closeFunction()}>
                        <AiOutlineClose />
                    </button>
                </div>
                <h1 className="text-[32px] font-bold text-center">
                    Edit Account
                </h1>
                <form className="flex flex-col gap-[8px] min-w-[300px]" onSubmit={handleSubmit}>
                    <input
                        className="focus:outline-none focus:shadow-outline w-full px-[16px] py-[4px] rounded-[4px] border-b"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="focus:outline-none focus:shadow-outline w-full px-[16px] py-[4px] rounded-[4px] border-b"
                        type="number"
                        name="initial_balance"
                        value={formData.initial_balance}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-black w-full text-white rounded-[4px] px-[16px] py-[4px] hover:underline"
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add"}
                    </button>
                </form>
                {errorMessage && (
                    <p className='text-red-500 text-center text-[12px]'>
                        {errorMessage}
                        {/* {token || "Token Not Found"} */}
                    </p>
                )}
            </div>
        </section>
    )
}

export default EditAccountsCard;
