import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MenuItem, AppSettings } from '../types';
import Header from '../components/Header';
import MenuGrid from '../components/MenuGrid';
import CartSidebar from '../components/CartSidebar';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Clock, MapPin, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Home: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();

  useEffect(() => {
    const q = query(collection(db, 'menu'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
      setMenuItems(items);
      setLoading(false);
    });

    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'general');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data() as AppSettings);
        }
      } catch (error) {
        console.error("Settings error:", error);
      }
    };

    fetchSettings();
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <Header />
      
      {/* Hero Section with Enhanced Background */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1920&q=80" 
            alt="Restaurant Bar Café Background"
            className="w-full h-full object-cover animate-pulse-slow"
            style={{ animationDuration: '20s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent animate-shimmer"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="mb-6 flex justify-center">
              <Logo size="large" className="border-[4px] border-[#d4af37] shadow-2xl animate-glow" />
            </div>
            <div className="mb-8">
              <span className="inline-block px-6 py-2 bg-[#d4af37]/10 backdrop-blur-md rounded-full text-[#d4af37] text-sm font-bold uppercase tracking-widest mb-4 animate-fade-in-up">
                Bienvenue à
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white tracking-tighter font-display">
                LA <span className="text-[#d4af37] animate-shimmer bg-gradient-to-r from-[#d4af37] via-[#f4e4c1] to-[#d4af37] bg-clip-text text-transparent">FABULEUSE</span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed px-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                L'excellence culinaire au cœur du Togo.<br className="hidden sm:block" />
                <span className="inline-block text-[#d4af37] font-semibold">Bar • Restaurant • Café</span>
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
              >
                <span className="text-[#d4af37] font-bold text-sm sm:text-base">🍽️ Restaurant</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
              >
                <span className="text-[#d4af37] font-bold text-sm sm:text-base">🍹 Bar</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
              >
                <span className="text-[#d4af37] font-bold text-sm sm:text-base">☕ Café</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <main className="py-16 sm:py-20 md:py-24 px-4 max-w-7xl mx-auto">
        <section className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Notre Menu</h2>
          <p className="text-gray-500 max-w-xl mx-auto px-4 text-sm sm:text-base">Découvrez nos saveurs uniques préparées avec passion et des ingrédients de première qualité.</p>
        </section>

        <MenuGrid items={menuItems} />
        
        {/* About Section */}
        <section className="mt-20 sm:mt-24 lg:mt-32 mb-12 sm:mb-16">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">À Propos de LA FABULEUSE</h2>
            <p className="text-gray-500 max-w-xl mx-auto px-4 text-sm sm:text-base">Une expérience culinaire inoubliable au cœur du Togo</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl border border-white/5 text-center"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl">🍽️</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#d4af37] mb-3 sm:mb-4">Cuisine Authentique</h3>
              <p className="text-gray-400 text-sm sm:text-base">Des plats traditionnels togolais revisités avec une touche moderne, préparés par nos chefs expérimentés.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl border border-white/5 text-center"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl">🍹</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#d4af37] mb-3 sm:mb-4">Bar Premium</h3>
              <p className="text-gray-400 text-sm sm:text-base">Une sélection raffinée de cocktails, vins et boissons locales pour accompagner vos repas.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl border border-white/5 text-center"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl">☕</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#d4af37] mb-3 sm:mb-4">Café Artistique</h3>
              <p className="text-gray-400 text-sm sm:text-base">Un espace chaleureux pour déguster nos cafés artisanaux et travailler dans une ambiance inspirante.</p>
            </motion.div>
          </div>
        </section>

        {/* Hours Section */}
        <section className="mb-12 sm:mb-16">
          <div className="bg-gradient-to-r from-[#800020]/20 to-[#1e3a8a]/20 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold text-[#d4af37] mb-4 sm:mb-6 text-center">Nos Horaires</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="font-bold text-white mb-2 sm:mb-3 text-sm sm:text-base">Restaurant & Bar</h4>
                <div className="space-y-1.5 sm:space-y-2 text-gray-300 text-sm">
                  <div className="flex justify-between">
                    <span>Lundi - Jeudi</span>
                    <span className="text-[#d4af37]">11h - 23h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vendredi - Samedi</span>
                    <span className="text-[#d4af37]">11h - 02h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche</span>
                    <span className="text-[#d4af37]">12h - 22h</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2 sm:mb-3 text-sm sm:text-base">Café</h4>
                <div className="space-y-1.5 sm:space-y-2 text-gray-300 text-sm">
                  <div className="flex justify-between">
                    <span>Lundi - Samedi</span>
                    <span className="text-[#d4af37]">07h - 20h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche</span>
                    <span className="text-[#d4af37]">08h - 18h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />

      {/* Floating Cart Button */}
      <AnimatePresence>
        {items.length > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 bg-[#d4af37] text-black p-3 sm:p-4 rounded-full shadow-2xl hover:bg-[#b8962e] transition-colors"
          >
            <div className="relative">
              <ShoppingCart size={20} className="sm:size-[28px]" />
              <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-[#800020] text-white text-xs w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-bold">
                {items.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        settings={settings}
      />
    </div>
  );
};

export default Home;
