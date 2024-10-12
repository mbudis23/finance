import { AiOutlineFileAdd, AiOutlineInteraction } from "react-icons/ai";

export default function AccountsPage(){
    return(
        <main className="p-[16px] flex flex-col gap-[16px]">
            <div className="w-full flex justify-end text-[32px] gap-[16px]">
                <AiOutlineInteraction/>
                <AiOutlineFileAdd/>
            </div>
            <section className="w-full grid grid-cols-9 py-[16px]]">
                {/* Header */}
                <h1 className="font-bold">Name</h1>
                <h1 className="font-bold">Initial Balance</h1>
                <h1 className="font-bold">Balance</h1>
                <h1 className="font-bold">Incomes</h1>
                <h1 className="font-bold">Expenses</h1>
                <h1 className="font-bold">Transfers In</h1>
                <h1 className="font-bold">Transfers Out</h1>
                <h1 className="font-bold">Transfers Tax</h1>
                <h1 className="font-bold">Adjustments</h1>
                {/* Isi */}
            </section>
        </main>
    )
}