import React from 'react';
import { AppSettings } from '../types';
import { MapPin, Phone, Facebook, Instagram, UtensilsCrossed, Mail, Clock, Globe } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  settings: AppSettings | null;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3">
            <Logo size="large" className="border-2 border-[#d4af37]" />
            <span className="text-xl sm:text-2xl font-bold tracking-tighter text-white">LA FABULEUSE</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Votre destination privilégiée pour une expérience culinaire d'exception au Togo. 
            Bar, Restaurant et Café réunis dans un cadre élégant et chaleureux.
          </p>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-[#800020]/20 border border-[#800020]/30 rounded-full">
              <span className="text-[10px] text-[#d4af37] font-bold">PREMIUM</span>
            </div>
            <div className="px-3 py-1 bg-[#1e3a8a]/20 border border-[#1e3a8a]/30 rounded-full">
              <span className="text-[10px] text-[#3b82f6] font-bold">QUALITÉ</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h4 className="text-[#d4af37] font-bold uppercase tracking-widest text-sm">Contact</h4>
          <ul className="space-y-3 sm:space-y-4">
            <li className="flex items-start gap-3 text-gray-400">
              <MapPin size={18} className="text-[#d4af37] shrink-0 mt-0.5" />
              <span className="text-sm">{settings?.address || 'Lomé, Togo'}</span>
            </li>
            <li className="flex items-center gap-3 text-gray-400">
              <Phone size={18} className="text-[#d4af37] shrink-0" />
              <span className="text-sm">+228 {settings?.whatsappNumber || '96058543'}</span>
            </li>
            <li className="flex items-center gap-3 text-gray-400">
              <Mail size={18} className="text-[#d4af37] shrink-0" />
              <span className="text-sm">contact@lafabuleuse.tg</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h4 className="text-[#d4af37] font-bold uppercase tracking-widest text-sm">Horaires</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex justify-between">
              <span>Lun-Jeu</span>
              <span className="text-[#d4af37]">7h30-23h</span>
            </li>
            <li className="flex justify-between">
              <span>Ven-Sam</span>
              <span className="text-[#d4af37]">7h30-2h</span>
            </li>
            <li className="flex justify-between">
              <span>Dimanche</span>
              <span className="text-[#d4af37]">7h30-23h</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h4 className="text-[#d4af37] font-bold uppercase tracking-widest text-sm">Suivez-nous</h4>
          <div className="flex gap-3">
            {settings?.facebookUrl ? (
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#d4af37] hover:text-black transition-all border border-white/10">
                <Facebook size={16} className="sm:size-20" />
              </a>
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 opacity-50">
                <Facebook size={16} className="sm:size-20" />
              </div>
            )}
            {settings?.instagramUrl ? (
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#d4af37] hover:text-black transition-all border border-white/10">
                <Instagram size={16} className="sm:size-20" />
              </a>
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 opacity-50">
                <Instagram size={16} className="sm:size-20" />
              </div>
            )}
            <a 
              href={`https://wa.me/228${settings?.whatsappNumber || '96058543'}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 bg-[#25D366] rounded-xl flex items-center justify-center hover:bg-[#128C7E] transition-all"
            >
              <Phone size={16} className="sm:size-20" />
            </a>
          </div>
          <div className="text-gray-500 text-xs">
            <p>Service client disponible</p>
            <p className="text-[#d4af37] font-bold">7j/7</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 sm:pt-8 border-t border-white/5">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="text-center lg:text-left text-gray-600 text-xs">
            <p>&copy; {currentYear} LA FABULEUSE. Tous droits réservés.</p>
            <p className="mt-1">Made with ❤️ au Togo</p>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-end gap-4 sm:gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-[#d4af37] transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
