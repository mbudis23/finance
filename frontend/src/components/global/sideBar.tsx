import Link from "next/link";
import { AiFillContainer, AiOutlineSwap, AiFillDollarCircle, AiOutlineArrowLeft, AiFillCalculator } from "react-icons/ai";

export default function SideBar(){
    return(
        <div
        className="min-h-screen absolute bg-white pt-[97px] px-[16px] z-[1] border-r text-black gap-[16px] flex flex-col">
            <Link 
            href={'/accounts'}
            className="text-[16px] w-[32px] aspect-square border-black bg-black text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-[1px]">
                <AiFillContainer/>
            </Link>
            <Link 
            href={'/incomes'}
            className="text-[32px] w-[32px] aspect-square border-black bg-white text-black rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-[1px]">
                <AiFillDollarCircle/>
            </Link>
            <Link 
            href={'/incomes'}
            className="text-[16px] w-[32px] aspect-square border-black bg-black text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-[1px]">
                <AiOutlineArrowLeft/>
            </Link>
            <Link 
            href={'/transfers'}
            className="text-[16px] w-[32px] aspect-square border-black bg-black text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-[1px]">
                <AiOutlineSwap/>
            </Link>
            <Link 
            href={'/transfers'}
            className="text-[16px] w-[32px] aspect-square border-black bg-black text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-[1px]">
                <AiFillCalculator/>
            </Link>
        </div>
    )
}