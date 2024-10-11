import Link from "next/link";

export default function RegisterCard(){
    return(
        <div 
        className="border-[1px] border-black p-[16px] rounded-[8px] flex flex-col gap-[16px]"
        >
            {/* Title */}
            <h1 
            className="text-[32px] font-bold text-center"
            >
                Register
            </h1>
            {/* Register Form */}
            <div className="flex flex-col gap-[8px] min-w-[300px]">
                <input
                className="focus:outline-none focus:shadow-outline w-full px-[16px] py-[4px] rounded-[4px] border-b " 
                type="email"
                placeholder="Email"
                />
                <input
                className="focus:outline-none focus:shadow-outline w-full px-[16px] py-[4px] rounded-[4px] border-b" 
                type="password"
                placeholder="Password"
                />
                <button className="bg-black w-full text-white rounded-[4px] px-[16px] py-[4px] hover:underline">Register</button>
            </div>
            <p 
            className='text-red-500 text-center text-[12px]'
            >
                {"\u00A0"}
            </p>
            <p 
            className='text-black text-center'
            >
                Already have an account? <Link className="hover:underline" href={'./'}>Login</Link>
            </p>
        </div>
    )
}