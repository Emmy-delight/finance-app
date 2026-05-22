import Image from "next/image";
import { LuLogOut } from "react-icons/lu";

export default function Profile () {
    return(
        <main className="min-h-screen flex justify-center py-20 px-5">
            <div className="w-full md:w-90 md:md:max-h-140 rounded shadow-md py-5 px-4">
                <h1 className="text-center font-semibold text-xl text-gray-700">User Details</h1>
                <div className="mt-3 flex justify-center">
                    <Image
                    src="/bg.jpg"
                    alt="profile image"
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full"
                    />
                </div>
                <div className="px-5 py-5 flex flex-col gap-4 mt-8 w-80 h-50 shadow rounded-md">
                     <div className="flex justify-between items-center">
                        <p className="font-semibnold">FullName</p>
                        <p className="text-gray-600 text-xs">Emmnauel John</p>
                     </div>
                      <div className="flex justify-between items-center">
                        <p className="font-semibnold">Email Address</p>
                        <p className="text-gray-600 text-xs">emmanuel@gmail.com</p>
                     </div>
                     <div className="flex justify-between items-center">
                        <p className="font-semibnold">Home Address</p>
                        <p className="text-gray-600 text-xs">143 Bacon street, Dallas Texas</p>
                     </div>       
                </div>
                <form className="mt-2">
                    <button className="w-30 h-10 shadow-md text-white bg-red-500 rounded-md flex justify-center items-center gap-2 cursor-pointer">
                        <LuLogOut className="text-2xl" />
                        <span>LogOut</span>

                    </button>
                </form>

            </div>

        </main>
    )
}