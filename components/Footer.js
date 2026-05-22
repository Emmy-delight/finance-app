import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";

export function Footer () {
    const year = new Date().getFullYear();
    return (
        <main className="bg-[#1D4ED8] px-10 py-3 inset-shadow-sm md:flex md:justify-between">
            <ul className="text-white">
                <li className="text-2xl font-bold">Finance App</li>
                <li className="text-sm">Financial institution</li>
                <li className="text-xs">&copy;{year} Allrights Reserved</li>
            </ul>
            <ul className="text-white">
                <li>Privacy</li>
                <li>Cookies</li>
                <li>Terms of Service</li>
            </ul>
            <div>
                <p className="text-white text-xl font-bold">Social Media Handles</p>
                <ul className="mt-2 flex gap-3">
                    <li><FaFacebookF className="text-xl text-white" /></li>
                    <li><FaInstagram className="text-xl text-white" /></li>
                    <li><FaXTwitter className="text-xl text-white" /></li>
                    <li><FaTiktok  className="text-xl text-white" /></li>
                </ul>
            </div>

        </main>
    )
}