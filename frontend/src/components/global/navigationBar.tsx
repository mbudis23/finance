import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";

export default function NavigationBar(){
    return (
        <div 
        className="absolute min-w-full top-0 left-0 bg-white text-black p-[16px] border-b-[1px] flex items-center justify-between"
        >
            <Link
            href={'/'}
            className="text-[32px] font-bold"
            >
                Finance
            </Link>
            <div className="text-[24px] p-[6px] border border-black rounded-full">
                <AiOutlineUser/>
            </div>
        </div>
    )
}