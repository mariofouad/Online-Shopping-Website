import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { items } = useCartStore();

    const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    return (
        <header className="bg-white shadow-sm border-b">
            {/* Top Banner */}
            <div className="bg-black text-white text-center py-2 text-sm">
                Sign up and get 20% off to your first order. Sign Up Now
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold">
                        SHOP.CO
                    </Link>

                    {/* Navigation - Desktop */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/products" className="hover:text-gray-600 transition-colors">
                            Shop
                        </Link>
                        <Link to="/products?category=on-sale" className="hover:text-gray-600 transition-colors">
                            On Sale
                        </Link>
                        <Link to="/products?category=new-arrivals" className="hover:text-gray-600 transition-colors">
                            New Arrivals
                        </Link>
                        <Link to="/brands" className="hover:text-gray-600 transition-colors">
                            Brands
                        </Link>
                    </nav>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                        </div>
                    </form>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-4">
                        <Link to="/cart" className="relative hover:text-gray-600 transition-colors">
                            <ShoppingCart className="w-6 h-6" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t">
                        <div className="flex flex-col space-y-4 mt-4">
                            <form onSubmit={handleSearch} className="flex items-center">
                                <div className="relative w-full">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search for products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                </div>
                            </form>
                            <Link to="/products" className="hover:text-gray-600 transition-colors">
                                Shop
                            </Link>
                            <Link to="/products?category=on-sale" className="hover:text-gray-600 transition-colors">
                                On Sale
                            </Link>
                            <Link to="/products?category=new-arrivals" className="hover:text-gray-600 transition-colors">
                                New Arrivals
                            </Link>
                            <Link to="/brands" className="hover:text-gray-600 transition-colors">
                                Brands
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
