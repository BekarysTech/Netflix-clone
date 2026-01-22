"use client";

import NavbarItem from './NavbarItem'
import MobileMenu from './MobileMenu'
import { useState, useCallback } from 'react';
import { Search, ChevronDown, Bell, User } from 'lucide-react';
import AccountMenu from './Account';

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, [])

    return (
        <nav>
            <div className='px-4 md:px-6 py-6 flex flex-row items-center transition duration-500 bg-black bg-opacity10'>
                <h2 className='text-4xl text-red-500 font-bold'>NETFLIX</h2>
                <div className='hidden md:flex flex-row items-center gap-4 ml-8'>
                    <NavbarItem label={'Home'} />
                    <NavbarItem label={'Series'} />
                    <NavbarItem label={'Films'} />
                    <NavbarItem label={'New & Popular'} />
                    <NavbarItem label={'My List'} />
                </div>

                <div onClick={toggleMobileMenu} className='md:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative'>
                    <p className="text-white text-sm">Browse</p>
                    <ChevronDown className='text-white size-4 fill-white transition' />
                    <MobileMenu visible={showMobileMenu} /> {/* MobileMenu component */}
                </div>

                <div className='flex flex-row items-center gap-10 ml-auto'>
                    <div className='text-white text-sm hover:underline cursor-pointer flex flex-row items-center gap-2'>
                        <Search className='text-white size-4 fill-white transition' />
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <div className='text-white mr-10 text-sm hover:underline cursor-pointer flex flex-row items-center gap-2'>
                            <Bell className='text-white size-4 fill-white transition' />
                        </div>
                        <div onClick={toggleMobileMenu} className='flex flex-row items-center gap-2 cursor-pointer relative'>
                            <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-full flex items-center justify-center cursor-pointer border-2 border-white'>
                                <User size={24} className='text-white fill-white' />
                            </div>
                            <ChevronDown className='text-white size-4 fill-white transition' />
                            <AccountMenu visible={setShowMobileMenu} />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;