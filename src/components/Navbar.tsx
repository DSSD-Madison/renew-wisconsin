import React from 'react';
import Link from 'next/link';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import {IconContext} from "react-icons";
import {useState} from 'react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleNav = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <nav className="fixed justify-center w-full h-16 bg-[#f39c12]">
            <div className="flex justify-center items-center h-full w-full px-4 2xl:px-16">
                <div className="md:hidden text-l text-white">
                    Electric Bus Cost Savings
                </div>
                <div className="hidden sm:flex">
                    <ul className="hidden sm:flex">
                        <Link href="/">
                            <li className="uppercase hover:border-b text-xl text-white">
                                Calculator
                            </li>
                        </Link>
                        <Link href="/equipment">
                            <li className="ml-10 uppercase hover:border-b text-xl text-white">
                                Equipment
                            </li>
                        </Link>
                        <Link href="/input">
                            <li className="ml-10 uppercase hover:border-b text-xl text-white">
                                Input
                            </li>
                        </Link>
                        <Link href="/admin">
                            <li className="ml-10 uppercase hover:border-b text-xl text-white">
                                Admin
                            </li>
                        </Link>
                    </ul>
                </div>
                <div onClick={handleNav} className="md:hidden cursor-pointer pl-24">
                    <IconContext.Provider value={{color: "white"}}>
                        <AiOutlineMenu size={24}/>
                    </IconContext.Provider>
                </div>
            </div>
                <div className={
                    menuOpen
                    ? "fixed left-0 top-0 w-[70%] sm:hidden h-screen bg-[#2495c4] p-10 ease-in duration-500"
                    : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
                }>
                <div className="flex w-full items-counter justify-end">
                    <div onClick={handleNav} className="cursor-pointer">
                        <IconContext.Provider value={{color: "white"}}>
                            <AiOutlineClose size={25}/>
                        </IconContext.Provider>
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