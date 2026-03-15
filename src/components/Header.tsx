import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UtensilsCrossed, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 py-4 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <Logo size="medium" className="border-2 border-[#d4af37] group-hover:scale-110 transition-transform shadow-lg" />
          <div className="hidden sm:block">
            <span className="text-xl font-bold tracking-tighter text-white block leading-none">LA FABULEUSE</span>
            <span className="text-[10px] text-[#d4af37] uppercase tracking-[0.2em] font-bold">Bar • Resto • Café</span>
          </div>
          <div className="sm:hidden text-white font-bold text-lg">
            LA FABULEUSE
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:block">
          <Link 
            to="/login" 
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-[#d4af37]"
            title="Espace Admin"
          >
            <User size={24} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="sm:hidden p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-[#d4af37]"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-black/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="/login" 
                className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-[#d4af37]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={20} />
                <span>Espace Admin</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
