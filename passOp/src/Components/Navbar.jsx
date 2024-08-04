// import React from 'react'

const Navbar = () => {
    return (
        <>
        <nav className='bg-slate-800 text-white sticky w-full top-0'>
            <div className="mycontainer flex justify-between items-center px-4 py-5">
            <div className="logo font-bold text-2xl">
            <span className='text-green-500'>&lt;</span>Pass
            <span className='text-green-500'>Op/&gt;</span>
            </div>
            {/* <ul>
                <li className='flex gap-4 '>
                    <a href="" className='hover:font-bold'>Home</a>
                    <a href="" className='hover:font-bold'>About</a>
                    <a href="" className='hover:font-bold'>Contact</a>
                </li>

            </ul> */}
            <button className="bg-green-500 rounded-full text-white flex justify-center items-center mx-40 ring-white ring-1">
            <img className="size-12" src="git.png" alt="git" />
             <span className="font-bold p-1">GitHub</span>
            </button>
            </div>
        </nav>
            

        </>
    )
}

export default Navbar
