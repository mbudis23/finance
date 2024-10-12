import { AiOutlineFileAdd, AiOutlineInteraction } from "react-icons/ai";

export default function TransfersPage () {
    return (
        <main className="p-[16px] flex flex-col gap-[16px] ">
            <section className="flex justify-between text-[32px]">
                <h1>Transfers</h1>
                <div className="flex fap-[16px] items-center">
                    <AiOutlineInteraction/>
                    <AiOutlineFileAdd/>
                </div>
            </section>
            <section className="grid grid-cols-5">
                <h1>Date</h1>
                <h1>Account</h1>
                <h1>Streams</h1>
                <h1>Amount</h1>
                <h1>Notes</h1>
            </section>
        </main>
    )
}