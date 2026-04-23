/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Clock, 
  Bike, 
  Info, 
  ChevronRight,
  X,
  MessageCircle,
  ArrowLeft
} from 'lucide-react';

// --- FORMATTER ---
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO').format(price);
};

// --- MOCK DATA ---
const RESTAURANT = {
  name: "Rumores Fast Food",
  description: "¡Perras, pero no tus vecinas! Calle 36B#13C-04",
  cover: "https://picsum.photos/seed/rumorescover/800/300",
  logo: "https://picsum.photos/seed/rumoreslogo/150/150",
  deliveryTime: "30-45 min",
  deliveryFee: "Por definir",
  minOrder: "$ 10.000",
  phone: "573104330179" // Número de WhatsApp (+57 310 4330179)
};

const CATEGORIES = [
  "Perras", 
  "Salchipapas", 
  "Para Compartir", 
  "Hamburguesas", 
  "Mazorcas", 
  "Desgranados", 
  "Bebidas", 
  "Adicionales"
];

const MENU = [
  // Perras
  { id: 101, category: "Perras", name: "La J1", desc: "Sencillo con doble salchicha", price: 7000, img: "https://picsum.photos/seed/perra1/200/200" },
  { id: 102, category: "Perras", name: "La J 2", desc: "Gemelo", price: 9000, img: "https://picsum.photos/seed/perra2/200/200" },
  { id: 103, category: "Perras", name: "La Yo No", desc: "Miti suizo", price: 10000, img: "https://picsum.photos/seed/perra3/200/200" },
  { id: 104, category: "Perras", name: "El Cacho Contento", desc: "Miti suizo + gratinado + tocineta", price: 16000, img: "https://picsum.photos/seed/perra4/200/200" },
  { id: 105, category: "Perras", name: "Juan Mecanico", desc: "Suizo", price: 18000, img: "https://picsum.photos/seed/perra5/200/200" },
  { id: 106, category: "Perras", name: "El Soldado Caido", desc: "Chorizo + butifarra", price: 18000, img: "https://picsum.photos/seed/perra6/200/200" },
  { id: 107, category: "Perras", name: "El Ssugar", desc: "Pollo + gratinado", price: 18000, img: "https://picsum.photos/seed/perra7/200/200" },
  { id: 108, category: "Perras", name: "El Perro HP", desc: "Suiza + carne + pollo + chorizo + butifarra + gratinado", price: 35000, img: "https://picsum.photos/seed/perra8/200/200" },

  // Salchipapas
  { id: 201, category: "Salchipapas", name: "La Basica", desc: "Salchipapa tradicional", price: 13000, img: "https://picsum.photos/seed/salchi1/200/200" },
  { id: 202, category: "Salchipapas", name: "La Cacorro", desc: "Chorizo y butifarra", price: 17000, img: "https://picsum.photos/seed/salchi2/200/200" },
  { id: 203, category: "Salchipapas", name: "La Casi Algo", desc: "Pollo", price: 18000, img: "https://picsum.photos/seed/salchi3/200/200" },
  { id: 204, category: "Salchipapas", name: "El Peluche", desc: "Salchicha suiza + gratinado", price: 20000, img: "https://picsum.photos/seed/salchi4/200/200" },
  { id: 205, category: "Salchipapas", name: "La Ex", desc: "Carne, pollo y gratinado", price: 25000, img: "https://picsum.photos/seed/salchi5/200/200" },

  // Para Compartir
  { id: 301, category: "Para Compartir", name: "La Relacion Seria x2", desc: "Carne + pollo + cerdo + chorizo + butifarra + salchicha + gratinado", price: 37000, img: "https://picsum.photos/seed/compartir1/200/200" },
  { id: 302, category: "Para Compartir", name: "El Trio", desc: "Carne + pollo + cerdo + chorizo + butifarra + salchicha + gratinado", price: 47000, img: "https://picsum.photos/seed/compartir2/200/200" },
  { id: 303, category: "Para Compartir", name: "La Rumores", desc: "Salchicha + carne + pollo + cerdo + chorizo + butifarra + suiza + gratinado", price: 57000, img: "https://picsum.photos/seed/compartir3/200/200" },
  { id: 304, category: "Para Compartir", name: "El Divorcio", desc: "Salchicha + carne + pollo + cerdo + chorizo + butifarra + suiza + gratinado", price: 80000, img: "https://picsum.photos/seed/compartir4/200/200" },

  // Hamburguesas
  { id: 401, category: "Hamburguesas", name: "La Cachona", desc: "Carne de res, cebolla grille, tomate, tocineta y queso motzarella, chongo", price: 18000, img: "https://picsum.photos/seed/hamburguesa1/200/200" },
  { id: 402, category: "Hamburguesas", name: "La Melva", desc: "Pechuga, cebolla grille, tomate, tocineta y queso motzarella, chongo", price: 18000, img: "https://picsum.photos/seed/hamburguesa2/200/200" },
  { id: 403, category: "Hamburguesas", name: "El Matrimonio", desc: "Combina las dos proteinas a tu gusto", price: 25000, img: "https://picsum.photos/seed/hamburguesa3/200/200" },

  // Mazorcas
  { id: 501, category: "Mazorcas", name: "La Danny", desc: "Sencilla", price: 12000, img: "https://picsum.photos/seed/mazorca1/200/200" },
  { id: 502, category: "Mazorcas", name: "La Modelo", desc: "Acompañada con pollo", price: 19000, img: "https://picsum.photos/seed/mazorca2/200/200" },
  { id: 503, category: "Mazorcas", name: "La Sarah Yamile", desc: "Carne + pollo + gratinado", price: 23000, img: "https://picsum.photos/seed/mazorca3/200/200" },
  { id: 504, category: "Mazorcas", name: "La Bendecida", desc: "Pollo + carne + chorizo + butifarra + gratinado", price: 25000, img: "https://picsum.photos/seed/mazorca4/200/200" },

  // Desgranados
  { id: 601, category: "Desgranados", name: "El Sumiso", desc: "Chorizo + butifarra", price: 15000, img: "https://picsum.photos/seed/desgranado1/200/200" },
  { id: 602, category: "Desgranados", name: "El Alborotao", desc: "Carne + pollo", price: 22000, img: "https://picsum.photos/seed/desgranado2/200/200" },
  { id: 603, category: "Desgranados", name: "El Mujeriego", desc: "Carne + pollo + chorizo + butifarra + gratinado", price: 28000, img: "https://picsum.photos/seed/desgranado3/200/200" },

  // Bebidas
  { id: 701, category: "Bebidas", name: "Gaseosa 1.5", desc: "", price: 9000, img: "https://picsum.photos/seed/bebida1/200/200" },
  { id: 702, category: "Bebidas", name: "Gaseosa Personal", desc: "", price: 4000, img: "https://picsum.photos/seed/bebida2/200/200" },
  { id: 703, category: "Bebidas", name: "Soda Hatsu", desc: "", price: 5000, img: "https://picsum.photos/seed/bebida3/200/200" },
  { id: 704, category: "Bebidas", name: "Te Hatsu", desc: "", price: 10000, img: "https://picsum.photos/seed/bebida4/200/200" },
  { id: 705, category: "Bebidas", name: "Cola y Pola Refajo", desc: "", price: 3500, img: "https://picsum.photos/seed/bebida5/200/200" },
  { id: 706, category: "Bebidas", name: "Aguila Negra", desc: "", price: 4000, img: "https://picsum.photos/seed/bebida6/200/200" },
  { id: 707, category: "Bebidas", name: "Budweiser", desc: "", price: 4200, img: "https://picsum.photos/seed/bebida7/200/200" },
  { id: 708, category: "Bebidas", name: "Costeñita", desc: "", price: 3500, img: "https://picsum.photos/seed/bebida8/200/200" },
  { id: 709, category: "Bebidas", name: "Costeña Bacana", desc: "", price: 3000, img: "https://picsum.photos/seed/bebida9/200/200" },
  { id: 710, category: "Bebidas", name: "Coronita", desc: "", price: 5000, img: "https://picsum.photos/seed/bebida10/200/200" },

  // Adicionales
  { id: 801, category: "Adicionales", name: "Suiza", desc: "", price: 8000, img: "https://picsum.photos/seed/adicional1/200/200" },
  { id: 802, category: "Adicionales", name: "Carne", desc: "", price: 10000, img: "https://picsum.photos/seed/adicional2/200/200" },
  { id: 803, category: "Adicionales", name: "Pollo", desc: "", price: 8000, img: "https://picsum.photos/seed/adicional3/200/200" },
  { id: 804, category: "Adicionales", name: "Tocineta", desc: "", price: 5000, img: "https://picsum.photos/seed/adicional4/200/200" },
  { id: 805, category: "Adicionales", name: "Queso Mozarella", desc: "", price: 6000, img: "https://picsum.photos/seed/adicional5/200/200" },
  { id: 806, category: "Adicionales", name: "Porcion de Papas", desc: "", price: 6000, img: "https://picsum.photos/seed/adicional6/200/200" },
];

// --- TYPES ---
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CheckoutData = {
  name: string;
  phone: string;
  neighborhood: string;
  address: string;
  paymentMethod: 'Efectivo' | 'Transferencia' | 'Tarjeta';
  amountReceived: string;
  comments: string;
};

const NEIGHBORHOODS = [
  "Atlántico", "Bellarena", "Boyaca", "Chiquinquira", "El Campito", 
  "El Limón", "El Milagro", "El Parque Sector Barranquilla", "José Antonio Galán", 
  "La Arboraya", "La Chinita", "La Luz", "La Magdalena", "La Unión", 
  "La Victoria", "Las Dunas", "Las Nieves", "Las Palmas", "Las Palmeras", 
  "Los Laureles", "Los Trupillos", "Moderno", "Montes", "Pasadena", 
  "Primero de Mayo El Ferry", "Rebolo", "San Jose", "San Nicolás", 
  "San Roque", "Santa Helena", "Simón Bolívar", "Tayrona", "Universal I", 
  "Universal II", "Villa Blanca", "Villa del Carmén"
].sort();

const getDeliveryFee = (neighborhood: string) => {
  if (!neighborhood) return 0;
  if (neighborhood === "La Unión") return 0;
  return 5000; // Default fee for other neighborhoods
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [direction, setDirection] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartStep, setCartStep] = useState<'cart' | 'checkout'>('cart');
  
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    name: '',
    phone: '',
    neighborhood: '',
    address: '',
    paymentMethod: 'Efectivo',
    amountReceived: '',
    comments: ''
  });

  // Scroll active category button into view
  useEffect(() => {
    const activeBtn = document.getElementById(`cat-btn-${activeCategory}`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeCategory]);

  const scrollToMenu = () => {
    const header = document.getElementById('category-nav');
    if (header) {
      const y = header.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY > y) {
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const handleCategoryClick = (category: string) => {
    const newIndex = CATEGORIES.indexOf(category);
    const currentIndex = CATEGORIES.indexOf(activeCategory);
    if (newIndex !== currentIndex) {
      setDirection(newIndex > currentIndex ? 1 : -1);
      setActiveCategory(category);
      scrollToMenu();
    }
  };

  const handleDragEnd = (e: any, { offset }: any) => {
    const swipe = offset.x;
    const currentIndex = CATEGORIES.indexOf(activeCategory);

    if (swipe < -50 && currentIndex < CATEGORIES.length - 1) {
      setDirection(1);
      setActiveCategory(CATEGORIES[currentIndex + 1]);
      scrollToMenu();
    } else if (swipe > 50 && currentIndex > 0) {
      setDirection(-1);
      setActiveCategory(CATEGORIES[currentIndex - 1]);
      scrollToMenu();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0
    })
  };

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0)); // Remove if quantity is 0
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryFee = getDeliveryFee(checkoutData.neighborhood);
  const finalTotal = cartTotal + deliveryFee;

  const handleWhatsAppCheckout = () => {
    const orderId = `CO-${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`;
    const now = new Date();
    
    // Formato de fecha: DD/MM/YYYY
    const dateStr = now.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });
    // Formato de hora: hh:mm am/pm
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();

    let message = `👋 Vengo de https://bigrow.ola.click\n`;
    message += `${orderId}\n`;
    message += `🗓️ ${dateStr} ⏰ ${timeStr}\n\n`;
    
    message += `*Tipo de servicio: Domicilio*\n\n`;
    
    message += `Nombre: ${checkoutData.name}\n`;
    message += `Teléfono: ${checkoutData.phone}\n`;
    message += `Barrio: ${checkoutData.neighborhood}\n`;
    message += `Dirección: ${checkoutData.address}\n\n`;
    
    message += `*📝 Productos*\n`;
    cart.forEach(item => {
      message += `*X${item.quantity} ${item.name}  $ ${formatPrice(item.price * item.quantity)}*\n`;
    });
    
    message += `\nSubtotal: $ ${formatPrice(cartTotal)}\n`;
    message += `Entrega: ${deliveryFee === 0 ? 'Gratis' : '$ ' + formatPrice(deliveryFee)}\n`;
    message += `*Total: $ ${formatPrice(finalTotal)}*\n\n`;
    
    message += `*💲 Pago*\n`;
    message += `Estado del pago: No pagado\n`;
    message += `*Total a pagar: $ ${formatPrice(finalTotal)}*\n`;
    
    if (checkoutData.paymentMethod === 'Efectivo') {
      const received = parseFloat(checkoutData.amountReceived) || finalTotal;
      const change = received > finalTotal ? received - finalTotal : 0;
      message += `Efectivo ${formatPrice(finalTotal)} (monto recibido ${formatPrice(received)}, vuelto ${formatPrice(change)})\n\n`;
    } else {
      message += `${checkoutData.paymentMethod}\n\n`;
    }
    
    if (checkoutData.comments.trim()) {
      message += `*Comentarios adicionales:*\n`;
      message += `_${checkoutData.comments}_\n\n`;
    }
    
    message += `👆 Envíanos este mensaje ahora. En cuanto lo recibamos estaremos atendiéndole.`;
    
    window.open(`https://wa.me/${RESTAURANT.phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const isCheckoutValid = checkoutData.name.trim() !== '' && checkoutData.phone.trim() !== '' && checkoutData.neighborhood !== '' && checkoutData.address.trim() !== '';

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Mobile container to simulate phone view on desktop */}
      <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl pb-24">
        
        {/* --- HEADER --- */}
        <header className="relative bg-white">
          <div className="h-48 w-full overflow-hidden">
            <img 
              src={RESTAURANT.cover} 
              alt="Cover" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="px-4 pt-2 pb-4 relative">
            <div className="absolute -top-12 left-4 p-1 bg-white rounded-2xl shadow-md">
              <img 
                src={RESTAURANT.logo} 
                alt="Logo" 
                className="w-20 h-20 rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="mt-10">
              <h1 className="text-2xl font-bold text-gray-900">{RESTAURANT.name}</h1>
              <p className="text-sm text-gray-500 mt-1">{RESTAURANT.description}</p>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1.5 rounded-full">
                <Clock className="w-4 h-4 text-orange-500" />
                {RESTAURANT.deliveryTime}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1.5 rounded-full">
                <Bike className="w-4 h-4 text-orange-500" />
                Envío: {RESTAURANT.deliveryFee}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1.5 rounded-full">
                <Info className="w-4 h-4 text-orange-500" />
                Min. {RESTAURANT.minOrder}
              </div>
            </div>
          </div>
        </header>

        {/* --- CATEGORY NAV (STICKY) --- */}
        <div id="category-nav" className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex overflow-x-auto no-scrollbar px-4 py-3 gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                id={`cat-btn-${category}`}
                onClick={() => handleCategoryClick(category)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category 
                    ? 'bg-orange-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* --- MENU LIST --- */}
        <main className="px-4 py-4 overflow-x-hidden min-h-[50vh]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeCategory}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="flex flex-col gap-4"
            >
              {MENU.filter(item => item.category === activeCategory).map(item => {
                const cartItem = cart.find(i => i.id === item.id);
                return (
                  <div key={item.id} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        {item.desc && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.desc}</p>
                        )}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-bold text-gray-900">${formatPrice(item.price)}</span>
                        
                        {cartItem ? (
                          <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-sm text-orange-500"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-sm font-semibold w-4 text-center">{cartItem.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center bg-orange-500 rounded-full shadow-sm text-white"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => addToCart(item)}
                            className="flex items-center gap-1 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-orange-100 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            Agregar
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="w-28 h-28 shrink-0 pointer-events-none">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* --- FLOATING CART BUTTON --- */}
        <AnimatePresence>
          {cartItemCount > 0 && !isCartOpen && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-6 left-0 right-0 z-30 flex justify-center px-4 pointer-events-none"
            >
              <div className="w-full max-w-md pointer-events-auto">
                <button 
                  onClick={() => {
                    setCartStep('cart');
                    setIsCartOpen(true);
                  }}
                  className="w-full bg-orange-500 text-white p-4 rounded-2xl shadow-lg shadow-orange-500/30 flex items-center justify-between hover:bg-orange-600 transition-colors active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      {cartItemCount}
                    </div>
                    <span className="font-semibold">Ver pedido</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">${formatPrice(cartTotal)}</span>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- CART & CHECKOUT MODAL --- */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 max-w-md mx-auto"
              />
              
              {/* Drawer */}
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto bg-white rounded-t-3xl shadow-2xl flex flex-col max-h-[90vh]"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
                  {cartStep === 'cart' ? (
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-orange-500" />
                      Tu Pedido
                    </h2>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setCartStep('cart')}
                        className="p-1.5 -ml-1.5 bg-gray-50 rounded-full text-gray-600 hover:bg-gray-100"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <h2 className="text-xl font-bold text-gray-900">Datos de envío</h2>
                    </div>
                  )}
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content Area */}
                <div className="overflow-y-auto p-5 flex-1 no-scrollbar">
                  {cartStep === 'cart' ? (
                    /* --- CART VIEW --- */
                    <>
                      {cart.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                          <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-20" />
                          <p>Tu carrito está vacío</p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4">
                          {cart.map(item => (
                            <div key={item.id} className="flex items-center justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                                <p className="text-orange-500 font-semibold text-sm">${formatPrice(item.price * item.quantity)}</p>
                              </div>
                              <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1 border border-gray-100">
                                <button 
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-600 hover:text-orange-500"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-600 hover:text-orange-500"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {cart.length > 0 && (
                        <div className="mt-8 pt-4 border-t border-gray-100 space-y-3">
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>Subtotal</span>
                            <span>${formatPrice(cartTotal)}</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>Envío (estimado)</span>
                            <span>{checkoutData.neighborhood ? (deliveryFee === 0 ? 'Gratis' : `$${formatPrice(deliveryFee)}`) : 'Selecciona tu barrio'}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold text-gray-900 pt-2">
                            <span>Total</span>
                            <span>${formatPrice(finalTotal)}</span>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    /* --- CHECKOUT FORM VIEW --- */
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                        <input 
                          type="text" 
                          value={checkoutData.name}
                          onChange={e => setCheckoutData({...checkoutData, name: e.target.value})}
                          placeholder="Ej. Alfonso"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                        <input 
                          type="tel" 
                          value={checkoutData.phone}
                          onChange={e => setCheckoutData({...checkoutData, phone: e.target.value})}
                          placeholder="Ej. 57 3237991725"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Barrio *</label>
                        <select 
                          value={checkoutData.neighborhood}
                          onChange={e => setCheckoutData({...checkoutData, neighborhood: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white"
                        >
                          <option value="" disabled>Selecciona tu barrio</option>
                          {NEIGHBORHOODS.map(hood => (
                            <option key={hood} value={hood}>{hood}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de entrega *</label>
                        <input 
                          type="text" 
                          value={checkoutData.address}
                          onChange={e => setCheckoutData({...checkoutData, address: e.target.value})}
                          placeholder="Ej. Carrera 16 36b 48 #48"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Método de pago</label>
                        <select 
                          value={checkoutData.paymentMethod}
                          onChange={e => setCheckoutData({...checkoutData, paymentMethod: e.target.value as any})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white"
                        >
                          <option value="Efectivo">Efectivo</option>
                          <option value="Transferencia">Transferencia</option>
                          <option value="Tarjeta">Tarjeta (Datafono)</option>
                        </select>
                      </div>

                      {checkoutData.paymentMethod === 'Efectivo' && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: 'auto', opacity: 1 }}
                        >
                          <label className="block text-sm font-medium text-gray-700 mb-1">¿Con cuánto vas a pagar?</label>
                          <input 
                            type="number" 
                            value={checkoutData.amountReceived}
                            onChange={e => setCheckoutData({...checkoutData, amountReceived: e.target.value})}
                            placeholder={`Ej. 50000 (Total: $${formatPrice(finalTotal)})`}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                          />
                        </motion.div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Comentarios adicionales</label>
                        <textarea 
                          value={checkoutData.comments}
                          onChange={e => setCheckoutData({...checkoutData, comments: e.target.value})}
                          placeholder="Instrucciones para llegar, sin cebolla, etc."
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="p-5 bg-gray-50 border-t border-gray-100 pb-8 shrink-0">
                  {cartStep === 'cart' ? (
                    <button 
                      disabled={cart.length === 0}
                      onClick={() => setCartStep('checkout')}
                      className="w-full bg-orange-500 text-white p-4 rounded-2xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 font-bold text-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:shadow-none"
                    >
                      Continuar
                    </button>
                  ) : (
                    <>
                      <button 
                        disabled={!isCheckoutValid}
                        onClick={handleWhatsAppCheckout}
                        className="w-full bg-[#25D366] text-white p-4 rounded-2xl shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-2 font-bold text-lg hover:bg-[#20bd5a] transition-colors disabled:opacity-50 disabled:shadow-none"
                      >
                        <MessageCircle className="w-6 h-6" />
                        Enviar Pedido
                      </button>
                      <p className="text-center text-xs text-gray-400 mt-3">
                        Serás redirigido a WhatsApp para confirmar tu pedido.
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
