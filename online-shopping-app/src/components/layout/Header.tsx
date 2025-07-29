import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, ChevronDown } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { items } = useCartStore();
    const [showMobileSearch, setShowMobileSearch] = useState(false);


    const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    return (
        <header className="bg-white">
            {/* Top Banner */}
            <div className="bg-black text-white text-center py-2 text-sm">
                Sign up and get 20% off to your first order. <span className="underline cursor-pointer">Sign Up Now</span>
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between gap-8">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    {/* Logo */}
                    <Link to="/" className="text-3xl font-extrabold">
                        SHOP.CO
                    </Link>

                    {/* Navigation - Desktop */}
                    <nav className="hidden lg:flex items-center space-x-6">
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-base hover:text-gray-600 transition-colors">
                                Shop
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                        <Link to="/products?category=on-sale" className="text-base hover:text-gray-600 transition-colors">
                            On Sale
                        </Link>
                        <Link to="/products?category=new-arrivals" className="text-base hover:text-gray-600 transition-colors">
                            New Arrivals
                        </Link>
                        <Link to="/brands" className="text-base hover:text-gray-600 transition-colors">
                            Brands
                        </Link>
                    </nav>

                    {/* Search Bar - Expanded */}
                    <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xl mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-gray-100 w-full pl-12 pr-4 py-3 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-black focus:bg-white border border-transparent focus:border-gray-200"
                            />
                        </div>
                    </form>


                    {/* Right Icons */}
                    <div className="flex items-center space-x-4">
                        {/* Mobile Search Icon - Only on small screens */}
                        <button
                            onClick={() => setShowMobileSearch(!showMobileSearch)}
                            className="md:hidden hover:text-gray-600 transition-colors"
                        >
                            <Search className="w-6 h-6" />
                        </button>

                        {/* Cart Icon */}
                        <Link to="/cart" className="relative hover:text-gray-600 transition-colors">
                            <ShoppingCart className="w-6 h-6" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>

                        {/* User Icon */}
                        <Link to="/account" className="md:block hover:text-gray-600 transition-colors">
                            <User className="w-6 h-6" />
                        </Link>

                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 pb-4 border-t pt-4">
                        <div className="flex flex-col space-y-4">
                            {/* Mobile Navigation */}
                            <Link to="/products" className="text-base hover:text-gray-600 transition-colors py-2">
                                Shop
                            </Link>
                            <Link to="/products?category=on-sale" className="text-base hover:text-gray-600 transition-colors py-2">
                                On Sale
                            </Link>
                            <Link to="/products?category=new-arrivals" className="text-base hover:text-gray-600 transition-colors py-2">
                                New Arrivals
                            </Link>
                            <Link to="/brands" className="text-base hover:text-gray-600 transition-colors py-2">
                                Brands
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
