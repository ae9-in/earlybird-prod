import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.header
                className={`main-header ${isScrolled ? 'scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="container header-container">
                    <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }} className="brand-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Early Bird<span>.</span>
                    </a>

                    <nav className="desktop-nav">
                        <a href="#how-it-works" className="nav-link">Process</a>
                        <a href="#deals" className="nav-link">Deals</a>
                        <a href="#why-it-works" className="nav-link">Strategy</a>
                        <MagneticButton intensity={0.2}>
                            <a href="#partner" className="join-btn btn-primary">Partner With Us</a>
                        </MagneticButton>
                    </nav>

                    <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
                        <Menu size={24} />
                    </button>
                </div>
            </motion.header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-menu-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="mobile-menu-content"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            <button className="close-menu-btn" onClick={() => setMobileMenuOpen(false)}>
                                <X size={24} />
                            </button>

                            <nav className="mobile-nav-links">
                                <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>Process</a>
                                <a href="#deals" onClick={() => setMobileMenuOpen(false)}>Deals</a>
                                <a href="#why-it-works" onClick={() => setMobileMenuOpen(false)}>Strategy</a>
                                <a href="#partner" className="mobile-join-btn" onClick={() => setMobileMenuOpen(false)}>
                                    Partner With Us
                                </a>
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
