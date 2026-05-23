import { signIn } from "@/auth";
import { RiTwitterXFill } from "react-icons/ri";
import { RiGoogleFill } from "react-icons/ri";

export default function Login (){
    return(
        <main className="min-h-screen flex justify-center px-20 py-10 ">
            <div className="w-full md:w-100 md:flex md:flex-col md:gap-3">
                <h1 className="font-bold text-center text-gray-700 md:text-2xl md:text-gray-700 md:font-bold md:text-center">Welcome to Finance App</h1>
                <p className="text-sm text-gray-400 text-center">Finance Management App</p>
                <div className="mt-3 flex flex-col gap-3">
                    <form>
                        <button type="submit" className="w-full h-11 rounded-full shadow-md bg-gray-600 flex items-center justify-center gap-3">
                            <RiTwitterXFill className="text-white text-2xl" />
                            <span className="text-white text-xl "> Twitter</span>
                        </button>
                    </form>
                    <p className="mt-2 text-gray-700 text-center">Or signup with</p>
                     <form 
                      action={ async ()=>{
                            "use server"
                            await signIn("google")
                      }}
                    >
                        <button className="w-full h-11 bg-red-300 rounded-full cursor-pointer flex justify-center items-center gap-3">
                            <RiGoogleFill className="text-2xl text-white" />
                            <span className="text-xl text-white">Google</span>
                        </button>
                    </form>
                </div>
                <p className="text-sm mt-4 text-center">By Registering, you agree to <span className="text-blue-300">Terms of use</span> and <span className="text-blue-300">Privacy Policy</span></p>

            </div>
            
        </main>
    )
}