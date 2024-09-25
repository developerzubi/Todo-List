import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-indigo-950 justify-around py-2 items-center'>
        <div className="logo cursor-pointer">
            <span className='text-violet-500 text-2xl font-bold'><span className='text-gray-500 text-5xl'>i/</span>Task</span>
        </div>
            <ul className='flex gap-8 mx-9 text-white'>
                <li className='cursor-pointer text-xl hover:font-bold transition-all'>Home</li>
                <li className='cursor-pointer text-xl hover:font-bold transition-all'>Your Task</li>
            </ul>
    </nav>
  )
}

export default Navbar