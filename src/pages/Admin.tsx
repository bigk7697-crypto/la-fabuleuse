import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db, DEFAULT_CONFIG } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, updateDoc, setDoc, getDoc, orderBy, limit, where, getDocs } from 'firebase/firestore';
import { MenuItem, AppSettings } from '../types';
import { 
  LogOut, Plus, Trash2, Edit2, Save, X, 
  Settings as SettingsIcon, Utensils, LayoutDashboard, Phone, MapPin, Globe,
  TrendingUp, Users, ShoppingCart, Clock, Eye, EyeOff,
  Download, Search, Filter, BarChart3, DollarSign,
  Package, Star, Calendar, Bell, Menu as MenuIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'react-hot-toast';
import ImageUpload from '../components/ImageUpload';

const Admin: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [settings, setSettings] = useState<AppSettings>({
    whatsappNumber: DEFAULT_CONFIG.whatsappNumber,
    address: 'Lomé, Togo',
    facebookUrl: '',
    instagramUrl: ''
  });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'menu' | 'orders' | 'analytics' | 'settings'>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: 'restaurant',
    image: '',
    available: true
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    popularItems: [],
    todayOrders: 0
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
      setLoading(false);
    });

    const q = query(collection(db, 'menu'));
    const unsubscribeMenu = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
      setMenuItems(items);
    });

    // Fetch orders for analytics
    const fetchOrders = async () => {
      try {
        const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(50));
        const ordersSnapshot = await getDocs(ordersQuery);
        const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
        
        // Calculate stats
        const totalRevenue = ordersData.reduce((sum, order) => sum + (order.total || 0), 0);
        const todayOrders = ordersData.filter(order => {
          const orderDate = order.createdAt?.toDate();
          const today = new Date();
          return orderDate?.toDateString() === today.toDateString();
        }).length;

        setStats({
          totalRevenue,
          totalOrders: ordersData.length,
          popularItems: [], // TODO: Calculate popular items
          todayOrders
        });
      } catch (error) {
        console.error("Orders fetch error:", error);
      }
    };

    fetchOrders();

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

    return () => {
      unsubscribeAuth();
      unsubscribeMenu();
    };
  }, [navigate]);


  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      console.log('🔍 Début sauvegarde plat');
      console.log('📝 Formulaire actuel:', formData);

      // Validation des champs - CORRIGÉ
      if (!formData.name || formData.name.trim() === '') {
        throw new Error('Le nom du plat est requis');
      }
      if (!formData.description || formData.description.trim() === '') {
        throw new Error('La description est requise');
      }
      if (!formData.price || formData.price <= 0) {
        throw new Error('Le prix doit être supérieur à 0');
      }
      
      // CORRIGÉ: Vérification correcte de l'image
      if (!formData.image || formData.image.trim() === '') {
        console.error('❌ Image vide ou manquante:', formData.image);
        throw new Error('L\'image est requise');
      }

      console.log('✅ Validation des champs OK');
      console.log('📸 Image présente:', formData.image ? 'OUI' : 'NON');
      console.log('📸 Type image:', formData.image.startsWith('data:image/') ? 'Base64' : 'URL');

      const itemData = {
        name: formData.name.trim(),
        price: Number(formData.price),
        description: formData.description.trim(),
        category: formData.category,
        image: formData.image.trim(),
        available: true,
        createdAt: new Date()
      };

      console.log('📸 Données finales à sauvegarder:', itemData);

      // Test de connexion Firestore
      console.log('🔥 Test connexion Firestore...');
      const testDoc = await getDoc(doc(db, 'settings', 'general'));
      console.log('🔥 Connexion Firestore OK:', testDoc.exists());

      if (editingItem) {
        console.log('📝 Mise à jour du plat:', editingItem.id);
        await updateDoc(doc(db, 'menu', editingItem.id), itemData);
        toast.success('Plat mis à jour avec succès');
      } else {
        console.log('➕ Ajout d\'un nouveau plat');
        const docRef = await addDoc(collection(db, 'menu'), itemData);
        console.log('✅ Plat ajouté avec ID:', docRef.id);
        toast.success('Plat ajouté avec succès');
      }

      // Réinitialisation du formulaire
      setFormData({ name: '', description: '', price: 0, category: 'restaurant', image: '', available: true });
      setImageFile(null);
      
    } catch (error: any) {
      console.error('❌ Erreur détaillée:', error);
      console.error('❌ Code erreur:', error.code);
      console.error('❌ Message erreur:', error.message);
      
      // Message d'erreur spécifique
      let errorMessage = 'Erreur lors de la sauvegarde';
      
      if (error.message && error.message.includes('nom')) {
        errorMessage = 'Le nom du plat est requis';
      } else if (error.message && error.message.includes('description')) {
        errorMessage = 'La description est requise';
      } else if (error.message && error.message.includes('prix')) {
        errorMessage = 'Le prix est invalide';
      } else if (error.message && error.message.includes('image')) {
        errorMessage = 'L\'image est requise - Veuillez sélectionner une image';
      } else if (error.code === 'permission-denied') {
        errorMessage = 'Permission refusée - Vérifiez les règles Firestore';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Service Firebase indisponible - Réessayez plus tard';
      } else if (error.code === 'deadline-exceeded') {
        errorMessage = 'Délai d\'attente dépassé - Réessayez';
      }
      
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce plat ?')) {
      try {
        await deleteDoc(doc(db, 'menu', id));
        toast.success('Plat supprimé');
      } catch (error: any) {
        toast.error('Erreur : ' + error.message);
      }
    }
  };

  const handleToggleAvailable = async (id: string, available: boolean) => {
    try {
      await updateDoc(doc(db, 'menu', id), { available });
      toast.success(`Plat ${available ? 'activé' : 'désactivé'}`);
    } catch (error: any) {
      toast.error('Erreur : ' + error.message);
    }
  };

  const handleExportData = async () => {
    try {
      const data = {
        menu: menuItems,
        settings: settings,
        orders: orders,
        exportDate: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `la-fabuleuse-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Données exportées avec succès');
    } catch (error) {
      toast.error('Erreur lors de l\'export');
    }
  };

  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'settings', 'general'), settings);
      toast.success('Paramètres enregistrés');
    } catch (error: any) {
      toast.error('Erreur : ' + error.message);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-white text-lg">Chargement de l'interface admin...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] text-white flex">
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-[#d4af37] text-black rounded-xl"
      >
        <MenuIcon size={24} />
      </button>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-[#1a1a1a] to-[#141414] border-r border-white/10 flex flex-col transition-transform duration-300`}>
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#d4af37] rounded-xl flex items-center justify-center shadow-lg">
              <LayoutDashboard className="text-black" size={20} />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-white">ADMIN</span>
              <span className="text-xs text-[#d4af37] block">LA FABULEUSE</span>
            </div>
          </div>

          <nav className="space-y-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                activeTab === 'dashboard' ? 'bg-[#d4af37] text-black font-bold shadow-lg' : 'text-gray-400 hover:bg-white/10'
              }`}
            >
              <BarChart3 size={20} className={activeTab === 'dashboard' ? 'text-black' : 'text-gray-400'} />
              <span className="flex-1 text-left">Tableau de bord</span>
              {activeTab === 'dashboard' && <div className="w-2 h-2 bg-black rounded-full"></div>}
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                activeTab === 'menu' ? 'bg-[#d4af37] text-black font-bold shadow-lg' : 'text-gray-400 hover:bg-white/10'
              }`}
            >
              <Utensils size={20} className={activeTab === 'menu' ? 'text-black' : 'text-gray-400'} />
              <span className="flex-1 text-left">Menu</span>
              <span className="bg-white/20 px-2 py-1 rounded-lg text-xs">{menuItems.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                activeTab === 'orders' ? 'bg-[#d4af37] text-black font-bold shadow-lg' : 'text-gray-400 hover:bg-white/10'
              }`}
            >
              <ShoppingCart size={20} className={activeTab === 'orders' ? 'text-black' : 'text-gray-400'} />
              <span className="flex-1 text-left">Commandes</span>
              <span className="bg-white/20 px-2 py-1 rounded-lg text-xs">{orders.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                activeTab === 'analytics' ? 'bg-[#d4af37] text-black font-bold shadow-lg' : 'text-gray-400 hover:bg-white/10'
              }`}
            >
              <TrendingUp size={20} className={activeTab === 'analytics' ? 'text-black' : 'text-gray-400'} />
              <span className="flex-1 text-left">Statistiques</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                activeTab === 'settings' ? 'bg-[#d4af37] text-black font-bold shadow-lg' : 'text-gray-400 hover:bg-white/10'
              }`}
            >
              <SettingsIcon size={20} className={activeTab === 'settings' ? 'text-black' : 'text-gray-400'} />
              <span className="flex-1 text-left">Paramètres</span>
            </button>
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {activeTab === 'menu' ? 'Gestion du Menu' : 'Paramètres Généraux'}
            </h1>
            <p className="text-gray-500">
              {activeTab === 'menu' ? `Vous avez ${menuItems.length} plats enregistrés` : 'Configurez les informations de contact et réseaux sociaux'}
            </p>
          </div>

          {activeTab === 'menu' && (
            <button
              onClick={() => {
                setEditingItem(null);
                setFormData({ name: '', description: '', price: 0, category: 'restaurant', image: '', available: true });
                setIsModalOpen(true);
              }}
              className="bg-[#d4af37] hover:bg-[#b8962e] text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all"
            >
              <Plus size={20} />
              Nouveau Plat
            </button>
          )}
        </header>

        {activeTab === 'menu' ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {menuItems.map(item => (
              <div key={item.id} className="bg-[#141414] border border-white/5 rounded-2xl p-6 flex gap-6 group">
                <div className="w-32 h-32 rounded-xl overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-[#d4af37]">{item.name}</h3>
                      <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">{item.price.toLocaleString()} FCFA</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">{item.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setFormData(item);
                        setIsModalOpen(true);
                      }}
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 bg-red-500/5 hover:bg-red-500/10 rounded-lg text-red-500 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl bg-[#141414] border border-white/5 rounded-3xl p-8">
            <form onSubmit={handleSaveSettings} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Phone size={16} className="text-[#d4af37]" />
                    Numéro WhatsApp
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={e => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-[#d4af37] outline-none transition-all"
                    placeholder="22890000000"
                  />
                  <p className="text-[10px] text-gray-500 italic">Format: 228XXXXXXXX (sans le +)</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={16} className="text-[#d4af37]" />
                    Adresse
                  </label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={e => setSettings({ ...settings, address: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-[#d4af37] outline-none transition-all"
                    placeholder="Lomé, Togo"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Réseaux Sociaux</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Globe size={16} className="text-[#d4af37]" />
                      Facebook URL
                    </label>
                    <input
                      type="url"
                      value={settings.facebookUrl}
                      onChange={e => setSettings({ ...settings, facebookUrl: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-[#d4af37] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Globe size={16} className="text-[#d4af37]" />
                      Instagram URL
                    </label>
                    <input
                      type="url"
                      value={settings.instagramUrl}
                      onChange={e => setSettings({ ...settings, instagramUrl: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-[#d4af37] outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#d4af37] hover:bg-[#b8962e] text-black font-bold px-8 py-4 rounded-xl flex items-center gap-3 transition-all ml-auto"
              >
                <Save size={20} />
                Enregistrer les modifications
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Modal for Add/Edit Item */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[90vh] overflow-y-auto bg-[#1a1a1a] rounded-3xl p-8 z-[70] border border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-[#d4af37]">
                  {editingItem ? 'Modifier le plat' : 'Ajouter un nouveau plat'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSaveItem} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Nom du plat</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#d4af37] outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Prix (FCFA)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: parseInt(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#d4af37] outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#d4af37] outline-none transition-all h-24 resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Catégorie</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#d4af37] outline-none transition-all appearance-none"
                    >
                      <option value="restaurant">Restaurant</option>
                      <option value="bar">Bar</option>
                      <option value="café">Café</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <ImageUpload
                      value={formData.image}
                      onChange={(url) => setFormData({ ...formData, image: url })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-[#d4af37] hover:bg-[#b8962e] text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {uploading ? (
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save size={20} />
                      {editingItem ? 'Mettre à jour' : 'Ajouter au menu'}
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
