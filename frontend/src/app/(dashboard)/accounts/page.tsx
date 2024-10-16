'use client'
import AddAccountsCard from "@/components/scoped/accountsPage/addAccountsCard";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineFileAdd, AiOutlineInteraction, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

interface Account {
    name: string,
    initial_balance: number,
    current_balance: number,
    total_incomes: number,
    total_expenses: number,
    total_transfer_in: number,
    total_transfer_out: number,
    total_transfer_tax: number,
    total_adjustments: number
}

export default function AccountsPage(){
    const [allAc, setAllAc] = useState<Account[]>([]);
    const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];

    const fetchAccounts = useCallback( async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/accounts/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAllAc(response.data); // Update the state with the fetched data
        } catch (err: unknown) {
            if (err instanceof Error) {
                // Safely access the message if it's an instance of Error
                alert(err.message);
            } else {
                // Handle other types of errors (e.g., non-Error objects)
                alert('An unknown error occurred');
            }
        }
    }, [token]);

    useEffect(() => {
        fetchAccounts(); // Call the async function
    }, [fetchAccounts]); // Dependencies array: Add token if it can change

    const [isAddOpen, setIsAddOpen] = useState(false)
    return(
        <>
        {isAddOpen&&<AddAccountsCard closeFunction={()=>{
            setIsAddOpen(false);
            fetchAccounts()
        }}/>}
        <main className="p-[16px] flex flex-col gap-[16px]">
            <div className="w-full flex justify-end text-[32px] gap-[16px]">
                <button onClick={()=>{
                    fetchAccounts();
                }}>
                    <AiOutlineInteraction/>
                </button>
                <button
                onClick={()=>{
                    setIsAddOpen(true);
                }}
                >
                    <AiOutlineFileAdd/>
                </button>
            </div>
            <section className="w-full grid grid-cols-10 py-[16px]]">
                {/* Header */}
                <h1 className="font-bold text-center">Name</h1>
                <h1 className="font-bold text-center">Initial Balance</h1>
                <h1 className="font-bold text-center">Balance</h1>
                <h1 className="font-bold text-center">Incomes</h1>
                <h1 className="font-bold text-center">Expenses</h1>
                <h1 className="font-bold text-center">Transfers In</h1>
                <h1 className="font-bold text-center">Transfers Out</h1>
                <h1 className="font-bold text-center">Transfers Tax</h1>
                <h1 className="font-bold text-center">Adjustments</h1>
                <h1 className="font-bold text-center">Actions</h1>
                {/* Isi */}
                {allAc.map((account,index) => (
                    <>
                        <div key={index}>
                            {account.name}
                        </div>
                        <div className="text-right">
                            Rp{account.initial_balance}
                        </div>
                        <div className="text-right">
                            {account.current_balance}
                        </div>
                        <div className="text-right">
                            {account.total_incomes}
                        </div>
                        <div className="text-right">
                            {account.total_expenses}
                        </div>
                        <div className="text-right">
                            {account.total_transfer_in}
                        </div>
                        <div className="text-right">
                            {account.total_transfer_out}
                        </div>
                        <div className="text-right">
                            {account.total_transfer_tax}
                        </div>
                        <div className="text-right">
                            {account.total_adjustments}
                        </div>
                        <div className="text-center flex items-center justify-center gap-[8px]">
                            <AiOutlineEdit/>
                            <AiOutlineDelete/>
                        </div>
                    </>
                ))}
            </section>
        </main>
        </>
    )
}