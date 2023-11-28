import React from 'react';
import Link from 'next/link';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import {FaBusAlt} from 'react-icons/fa';
import {IconContext} from "react-icons";
import {useState} from 'react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleNav = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <nav className="fixed justify-center w-full h-16 bg-[#f39c12] z-0 relative z-50">
            <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
                <div className="flex md:text-xl sm:text-sm text-white">
                    <FaBusAlt size={24}/>
                    <h1 className="px-2">
                        Electric Bus Savings Calculator
                    </h1>
                </div>
                <div className="hidden sm:flex">
                    <ul className="hidden sm:flex">
                        <Link href="/">
                            <li className="ml-6 uppercase hover:border-b text-xl text-white p-2">
                                Calculator
                            </li>
                        </Link>
                        <Link href="/equipment">
                            <li className="ml-6 uppercase hover:border-b text-xl text-white p-2">
                                Equipment
                            </li>
                        </Link>
                        <Link href="/input">
                            <li className="ml-6 uppercase hover:border-b text-xl text-white p-2">
                                Assumptions
                            </li>
                        </Link>
                        <Link href="/admin">
                            <li className="ml-6 uppercase hover:bg-[#2086b0] text-xl text-white bg-[#2495c4] p-2 rounded">
                                Admin
                            </li>
                        </Link>
                    </ul>
                </div>
                <div onClick={handleNav} className="md:hidden cursor-pointer pl-24">
                    <AiOutlineMenu size={24}/>
                </div>
            </div>
                <div className={
                    menuOpen
                    ? "fixed left-0 top-0 w-[70%] sm:hidden h-screen bg-[#2495c4] p-10 ease-in duration-500"
                    : "fixed left-[-100%] top-0 p-10 ease-in duration-500 h-screen"
                }>
                <div className="flex w-full items-counter justify-end">
                    <div onClick={handleNav} className="cursor-pointer">
                        <AiOutlineClose size={25}/>
                    </div>
                </div>
                <div className="flex-col py-4">
                    <ul>
                        <Link href="/">
                            <li 
                            onClick={() => setMenuOpen(false)}
                            className="py-4 cursor-pointer text-white">
                                Calculator
                            </li>
                        </Link>
                        <Link href="/equipment">
                            <li 
                            onClick={() => setMenuOpen(false)}
                            className="py-4 cursor-pointer text-white">
                                Equipment
                            </li>
                        </Link>
                        <Link href="/input">
                            <li 
                            onClick={() => setMenuOpen(false)}
                            className="py-4 cursor-pointer text-white">
                                Input
                            </li>
                        </Link>
                        <Link href="/admin">
                            <li 
                            onClick={() => setMenuOpen(false)}
                            className="py-4 cursor-pointer text-white">
                                Admin
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar