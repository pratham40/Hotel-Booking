import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { CiMenuFries, CiSearch } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';

// Icon Component
const BookIcons = () => <i className="fa-solid fa-book"></i>;

const NavBar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/rooms' },
        { name: 'Experience', path: '/' },
        { name: 'About', path: '/' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { openSignIn } = useClerk();
    const { user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    // Scroll and Route-based Navbar style
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10 || location.pathname !== '/') {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        handleScroll(); // Run on mount & on route change

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 shadow-md backdrop-blur-lg py-3 md:py-4 text-gray-700' : 'py-4 md:py-6 text-white'}`}>

            {/* Logo */}
            <Link to="/" aria-label="Home">
                <img src={assets.logo} alt="Logo" className={`h-9 transition-all duration-300 ${isScrolled ? 'invert opacity-80' : ''}`} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, index) => (
                    <Link
                        key={index}
                        to={link.path}
                        className={`group flex flex-col items-center ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                    >
                        {link.name}
                        <span className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${isScrolled ? 'bg-gray-700' : 'bg-white'}`} />
                    </Link>
                ))}

                <button
                    onClick={() => navigate("/owner")}
                    className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all ${isScrolled ? 'text-black border-black' : 'text-white border-white'}`}
                >
                    Dashboard
                </button>
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center gap-4">

                <CiSearch/>

                {user ? (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label="Bookings" labelIcon={<BookIcons />} onClick={() => navigate("/my-bookings")} />
                        </UserButton.MenuItems>
                    </UserButton>
                ) : (
                    <button
                        onClick={openSignIn}
                        className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
                    >
                        Login
                    </button>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
                    < CiMenuFries className={`h-4 ${isScrolled ? 'invert' : ''}`} />
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-6 text-gray-800 text-base font-medium transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                
                <button onClick={() => setIsMenuOpen(false)} aria-label="Close Menu" className="absolute top-4 right-4">
                    <IoClose className="h-6.5" />
                </button>

                {user && (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label="Bookings" labelIcon={<BookIcons />} onClick={() => { setIsMenuOpen(false); navigate("/my-bookings"); }} />
                        </UserButton.MenuItems>
                    </UserButton>
                )}

                {navLinks.map((link, index) => (
                    <Link
                        key={index}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="hover:text-black transition-colors duration-200"
                    >
                        {link.name}
                    </Link>
                ))}

                {user ? (
                    <button
                        onClick={() => { setIsMenuOpen(false); navigate("/owner"); }}
                        className="border px-4 py-1 text-sm font-light rounded-full"
                    >
                        Dashboard
                    </button>
                ) : (
                    <button
                        onClick={() => { setIsMenuOpen(false); openSignIn(); }}
                        className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
