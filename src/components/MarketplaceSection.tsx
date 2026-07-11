import { PageBanner } from "./PageBanner";
import { CategoryTabs } from "./CategoryTabs";
import React, { useState } from "react";
import { Product, UserProfile, ConsultancyTask } from "../types";
import { findBestTasks } from "../lib/routing";
import {
  ShoppingCart,
  Star,
  ShieldCheck,
  ShoppingBag,
  Plus,
  Sparkles,
  X,
  Target,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MarketplaceSectionProps {
  userProfile: UserProfile;
  products: Product[];
  tasks: ConsultancyTask[];
  onUpdateProducts: (products: Product[]) => void;
  onUpdateTasks: (tasks: ConsultancyTask[]) => void;
  onOpenAiChat: (prompt: string, context: string) => void;
}

export default function MarketplaceSection({
  userProfile,
  products,
  tasks,
  onUpdateProducts,
  onUpdateTasks,
  onOpenAiChat,
}: MarketplaceSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSellOpen, setIsSellOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<
    "cart" | "payment" | "success"
  >("cart");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");

  // New product inputs
  const [newProdName, setNewProdName] = useState("");
  const [newProdCat, setNewProdCat] = useState("Tech & SaaS");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdImg, setNewProdImg] = useState("");

  const categories = [
    "All",
    "Digital IP",
    "Agency Retainers",
    "Smart Contracts",
    "Tech & SaaS",
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Cart actions
  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.product.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { product, qty: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.product.price * item.qty, 0);
  };

  const handleCheckout = () => {
    setCheckoutStep("payment");
  };

  const handlePlaceOrder = () => {
    setCheckoutStep("success");
    setCart([]);
  };

  // Sell product
  const handleSellProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: newProdName,
      category: newProdCat,
      price: parseFloat(newProdPrice),
      seller: userProfile.name,
      sellerRating: 5.0,
      verified: true,
      image:
        newProdImg ||
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300",
      description:
        newProdDesc || "Premium quality item listed on ESTARR.",
      reviews: [],
    };

    onUpdateProducts([newProduct, ...products]);
    setIsSellOpen(false);
    setNewProdName("");
    setNewProdPrice("");
    setNewProdDesc("");
    setNewProdImg("");
    alert("Listing published successfully! You are now selling on ESTARR.");
  };

  return (
    <div id="marketplace-section" className="flex flex-col gap-6">
      <PageBanner
        title="Brand Campaigns"
        subtitle="EXCLUSIVE SPONSORSHIPS"
        description="Browse curated, high-budget brand campaigns. Once approved, your consultancy engagement automatically moves into our secure Escrow Pipeline to guarantee your payout."
        icon={ShoppingCart}
        actions={
          <div className="flex gap-3">
            <button
              id="btn-sell-on-loud"
              onClick={() => setIsSellOpen(true)}
              className="bg-[#059669] hover:bg-[#047857] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-md"
            >
              <Plus className="w-4 h-4" /> Sell on ESTARR
            </button>
            <button
              id="btn-open-cart"
              onClick={() => setIsCartOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shadow-sm relative"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-mono animate-pulse">
                  {cart.reduce((sum, i) => sum + i.qty, 0)}
                </span>
              )}
            </button>
          </div>
        }
      />

      {/* Escrow Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3 items-start text-xs text-emerald-900">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-emerald-950">ESTARR 100% Escrow Protection Guard</h4>
          <p className="text-emerald-800 mt-0.5">
            Your money stays securely locked in escrow until the supplier
            delivers your items or completes the service. Upon verification, the
            escrow automatically pays out. Absolutely risk-free!
          </p>
        </div>
      </div>

      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />
      
      {/* Best Matched Tasks */}
      <div className="mt-8">
        <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-500" /> Best Matched Consultancy Tasks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {findBestTasks(userProfile, tasks).length > 0 ? (
            findBestTasks(userProfile, tasks).slice(0, 4).map(task => (
              <div key={task.id} className="bg-slate-900 border border-slate-700 p-4 rounded-xl">
                <h4 className="text-white font-bold text-sm">{task.title}</h4>
                <p className="text-slate-400 text-xs mt-1">{task.desc}</p>
                <div className="flex gap-2 mt-3">
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded-md">Required: {task.skillRequired}</span>
                  <span className="text-[10px] bg-emerald-600/20 text-emerald-400 px-2 py-1 rounded-md">{task.priority} Priority</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">No matching tasks yet based on your profile skills.</p>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            id={`prod-card-${prod.id}`}
            className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className={`relative h-48 overflow-hidden flex items-center justify-center bg-gradient-to-br ${
              prod.category === "Digital IP" ? "from-indigo-600 to-purple-700" :
              prod.category === "Agency Retainers" ? "from-emerald-600 to-teal-700" :
              prod.category === "Smart Contracts" ? "from-amber-500 to-orange-600" :
              "from-slate-700 to-slate-800"
            }`}>
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-lg">
                  {prod.category === "Digital IP" && <Sparkles className="w-8 h-8 text-white/80" />}
                  {prod.category === "Agency Retainers" && <ShoppingBag className="w-8 h-8 text-white/80" />}
                  {prod.category === "Smart Contracts" && <ShieldCheck className="w-8 h-8 text-white/80" />}
                  {!["Digital IP", "Agency Retainers", "Smart Contracts"].includes(prod.category) && <Plus className="w-8 h-8 text-white/80" />}
                </div>
                <span className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.2em]">
                  {prod.category}
                </span>
              </div>
              {prod.verified && (
                <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  🛡️ VERIFIED SELLER
                </span>
              )}
              <span className="absolute bottom-3 right-3 bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-2.5 py-1 rounded-xl">
                ${prod.price.toLocaleString()}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col gap-4 justify-between">
              <div>
                <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono mb-1">
                  <span>{prod.category}</span>
                  <span className="flex items-center gap-0.5 text-purple-500">
                    <Star className="w-3 h-3 fill-amber-500" />{" "}
                    {prod.sellerRating}
                  </span>
                </div>
                <h4 className="font-display font-bold text-sm text-white leading-snug line-clamp-1">
                  {prod.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>

                <div className="text-[10px] text-slate-400 font-medium mt-3 bg-slate-950 px-2.5 py-1.5 rounded-xl flex items-center justify-between border border-slate-800/50">
                  <span>
                    Seller: <strong>{prod.seller}</strong>
                  </span>
                  <span className="text-emerald-600 font-mono">
                    Escrow Active
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-800">
                <button
                  id={`btn-prod-view-${prod.id}`}
                  onClick={() => setSelectedProduct(prod)}
                  className="flex-1 bg-slate-800 hover:bg-slate-800 text-white py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  View Details
                </button>
                <button
                  id={`btn-add-cart-${prod.id}`}
                  onClick={() => addToCart(prod)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI recommendation sidebar-integration hook */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex items-start gap-4 shadow-sm">
        <div className="bg-slate-900 text-white p-2.5 rounded-xl font-bold font-mono text-xs">
          ESTARR AI
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h4 className="font-display font-bold text-sm text-white">
            Looking for a specific supplier, service, or talent asset?
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            ESTARR AI can suggest local wholesale hubs, estimate bulk pricing,
            analyze importation rates, or write delivery logistics and proposals.
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            <button
              id="btn-ai-supp"
              onClick={() =>
                onOpenAiChat(
                  "Suggest the top suppliers and market channels for starting an e-commerce WhatsApp clothing boutique in Nigeria. Estimate initial costs in Naira.",
                  "business",
                )
              }
              className="bg-slate-900 hover:bg-slate-900 hover:text-white border border-slate-700 text-white px-3 py-1.5 rounded-xl text-[11px] font-semibold cursor-pointer transition-all"
            >
              🛍️ Suggest Sourcing Strategies
            </button>
            <button
              id="btn-ai-price"
              onClick={() =>
                onOpenAiChat(
                  "Help me draft an email to a manufacturing supplier to request quotes for building materials in bulk. Make it professional and include escrow references.",
                  "business",
                )
              }
              className="bg-slate-900 hover:bg-slate-900 hover:text-white border border-slate-700 text-white px-3 py-1.5 rounded-xl text-[11px] font-semibold cursor-pointer transition-all"
            >
              📄 Request Supplier Email Template
            </button>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              <button
                id="btn-close-modal"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-800 text-slate-300 p-2 rounded-full cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6 md:p-8 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className={`md:col-span-5 h-56 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br ${
                    selectedProduct.category === "Digital IP" ? "from-indigo-600 to-purple-700" :
                    selectedProduct.category === "Agency Retainers" ? "from-emerald-600 to-teal-700" :
                    selectedProduct.category === "Smart Contracts" ? "from-amber-500 to-orange-600" :
                    "from-slate-700 to-slate-800"
                  }`}>
                    <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
                      {selectedProduct.category === "Digital IP" && <Sparkles className="w-10 h-10 text-white/80" />}
                      {selectedProduct.category === "Agency Retainers" && <ShoppingBag className="w-10 h-10 text-white/80" />}
                      {selectedProduct.category === "Smart Contracts" && <ShieldCheck className="w-10 h-10 text-white/80" />}
                      {!["Digital IP", "Agency Retainers", "Smart Contracts"].includes(selectedProduct.category) && <Plus className="w-10 h-10 text-white/80" />}
                    </div>
                  </div>
                  <div className="md:col-span-7 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                        {selectedProduct.category}
                      </span>
                      <h3 className="font-display font-bold text-base md:text-lg text-white mt-2">
                        {selectedProduct.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Listed by: <strong>{selectedProduct.seller}</strong> (
                        {selectedProduct.sellerRating} ★)
                      </p>
                    </div>

                    <div className="mt-4 md:mt-0">
                      <span className="text-xl font-mono font-bold text-white">
                        ${selectedProduct.price.toLocaleString()}
                      </span>
                      <p className="text-[10px] text-emerald-600 font-medium">
                        🛡️ Escrow Locked Payout Protection
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-xs text-white">
                    Description
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Reviews */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-xs text-white">
                    Customer Feedbacks
                  </h4>
                  {selectedProduct.reviews.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {selectedProduct.reviews.map((rev, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-950 p-3 rounded-xl border border-slate-800/50 text-xs"
                        >
                          <div className="flex justify-between font-bold text-slate-300 mb-1">
                            <span>{rev.author}</span>
                            <span className="text-purple-500">
                              {"★".repeat(Math.round(rev.rating))}
                            </span>
                          </div>
                          <p className="text-slate-400">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">
                      No reviews yet for this listing. Be the first to buy and
                      leave feedback!
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-4 border-t border-slate-800">
                  <button
                    id="btn-modal-add-cart"
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Shopping Cart
                  </button>
                  <button
                    id="btn-modal-back"
                    onClick={() => setSelectedProduct(null)}
                    className="bg-slate-800 hover:bg-slate-800 text-white px-6 py-3 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Close View
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sell Product Modal Drawer */}
      <AnimatePresence>
        {isSellOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onSubmit={handleSellProduct}
              className="bg-slate-900 rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl relative flex flex-col gap-5"
            >
              <button
                type="button"
                id="btn-close-sell"
                onClick={() => setIsSellOpen(false)}
                className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-800 text-slate-300 p-2 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  Launch a Campaign
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  List your products or services. Customers pay securely using
                  escrow.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">
                    Listing Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Heavy Duty Plastering Sand"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">
                      Category
                    </label>
                    <select
                      value={newProdCat}
                      onChange={(e) => setNewProdCat(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none"
                    >
                      <option value="Digital IP">Digital IP</option>
                      <option value="Agency Retainers">Agency Retainers</option>
                      <option value="Smart Contracts">Smart Contracts</option>
                      <option value="Tech & SaaS">Tech & SaaS</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 5000"
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-slate-800"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">
                    Description
                  </label>
                  <textarea
                    placeholder="Provide details about delivery, sizes, or parameters..."
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-300 focus:outline-none min-h-[60px]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">
                    Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="e.g. https://images.unsplash.com/..."
                    value={newProdImg}
                    onChange={(e) => setNewProdImg(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 focus:outline-none"
                  />
                </div>
              </div>

              <button
                id="btn-sell-submit"
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-sm"
              >
                Publish Storefront Listing
              </button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      {/* Cart & Checkout Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-end z-50">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="bg-slate-900 max-w-md w-full h-full shadow-2xl p-6 md:p-8 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-emerald-600" /> Cart &
                    Checkout
                  </h3>
                  <button
                    id="btn-close-cart"
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutStep("cart");
                    }}
                    className="bg-slate-800 hover:bg-slate-800 text-slate-300 p-2 rounded-full cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {checkoutStep === "cart" && (
                  <div className="flex flex-col gap-4">
                    {cart.length > 0 ? (
                      <>
                        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
                          {cart.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex gap-4 p-3 border border-slate-800 rounded-xl text-xs"
                            >
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${
                                item.product.category === "Digital IP" ? "from-indigo-600 to-purple-700" :
                                item.product.category === "Agency Retainers" ? "from-emerald-600 to-teal-700" :
                                item.product.category === "Smart Contracts" ? "from-amber-500 to-orange-600" :
                                "from-slate-700 to-slate-800"
                              }`}>
                                {item.product.category === "Digital IP" && <Sparkles className="w-5 h-5 text-white/70" />}
                                {item.product.category === "Agency Retainers" && <ShoppingBag className="w-5 h-5 text-white/70" />}
                                {item.product.category === "Smart Contracts" && <ShieldCheck className="w-5 h-5 text-white/70" />}
                                {!["Digital IP", "Agency Retainers", "Smart Contracts"].includes(item.product.category) && <Plus className="w-5 h-5 text-white/70" />}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-white line-clamp-1">
                                  {item.product.name}
                                </h4>
                                <p className="text-[10px] text-slate-400 mt-0.5">
                                  Seller: {item.product.seller}
                                </p>
                                <div className="flex justify-between items-center mt-2 font-mono">
                                  <span className="text-slate-400">
                                    Qty: {item.qty}
                                  </span>
                                  <span className="font-bold">
                                    $
                                    {(
                                      item.product.price * item.qty
                                    ).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                              <button
                                id={`btn-cart-remove-${idx}`}
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-rose-500 font-bold hover:text-rose-600 flex items-center justify-center p-1"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-slate-800 pt-4 mt-2">
                          <div className="flex justify-between font-mono text-sm font-bold text-white">
                            <span>Subtotal</span>
                            <span>${calculateSubtotal().toLocaleString()}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">
                            Escrow commission: 0% • Delivery arranged separately
                          </p>
                          <button
                            id="btn-proceed-checkout"
                            onClick={handleCheckout}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-sm mt-4"
                          >
                            Proceed to Secure Escrow Checkout
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12 flex flex-col items-center gap-3">
                        <ShoppingBag className="w-8 h-8 text-slate-300" />
                        <p className="text-xs text-slate-400">
                          Your shopping cart is currently empty.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {checkoutStep === "payment" && (
                  <div className="flex flex-col gap-5 text-xs">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600">
                      Secure Escrow Checkout
                    </span>

                    <div className="border border-emerald-500/20 bg-emerald-500/10/50 rounded-xl p-4">
                      <div className="flex justify-between font-mono font-bold text-white mb-1">
                        <span>Total Payable</span>
                        <span>${calculateSubtotal().toLocaleString()}</span>
                      </div>
                      <p className="text-[10px] text-emerald-400">
                        Funded in Escrow Vault. Safe and guarded.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-bold text-slate-300">
                        Choose Secure Payment Method
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Bank Transfer",
                          "Debit Card",
                          "Mobile Money",
                          "ESTARR Wallet",
                        ].map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPaymentMethod(method)}
                            className={`p-3 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                              paymentMethod === method
                                ? "bg-slate-900 text-white border-slate-950 shadow-sm"
                                : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-[11px] text-slate-400">
                      <p className="font-bold mb-1 text-slate-400">
                        🔒 ESTARR Escrow Agreement
                      </p>
                      <p className="leading-relaxed">
                        By placing this order, your payment will be held in a
                        trusted escrow pool. Funds will be released to the
                        seller only when you confirm receipt in-app or within 7
                        days of verified dispatch.
                      </p>
                    </div>

                    <div className="flex gap-2 mt-4 pt-4 border-t border-slate-800">
                      <button
                        id="btn-place-order"
                        onClick={handlePlaceOrder}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-sm"
                      >
                        Confirm Escrow Lock & Place Order
                      </button>
                      <button
                        id="btn-payment-back"
                        onClick={() => setCheckoutStep("cart")}
                        className="bg-slate-800 hover:bg-slate-800 text-white px-4 py-3 rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                )}

                {checkoutStep === "success" && (
                  <div className="text-center py-8 flex flex-col items-center gap-4">
                    <div className="bg-emerald-100 text-emerald-300 p-4 rounded-full">
                      <ShieldCheck className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-white">
                        Escrow Locked Successfully!
                      </h4>
                      <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">
                        Your funds are secured. The seller has been notified to
                        package and dispatch your order. Track your shipment or
                        contact the seller right inside Connect!
                      </p>
                    </div>
                    <button
                      id="btn-success-finish"
                      onClick={() => {
                        setIsCartOpen(false);
                        setCheckoutStep("cart");
                      }}
                      className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors mt-2"
                    >
                      Return to Campaigns
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
