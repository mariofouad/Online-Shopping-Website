import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleNewsletterSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            // TODO: Call newsletter API
            toast.success('Successfully subscribed to newsletter!');
            setEmail('');
        }
    };

    return (
        <footer className="bg-gray-50 border-t">
            {/* Newsletter Section */}
            <div className="bg-black text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-4">STAY UP TO DATE ABOUT OUR LATEST OFFERS</h2>
                    <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto">
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-white"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium"
                            >
                                Subscribe to Newsletter
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">SHOP.CO</h3>
                        <p className="text-gray-600 mb-4">
                            We have clothes that suits your style and which you're proud to wear. From women to men.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social Media Icons */}
                            <div className="w-8 h-8 bg-black rounded-full"></div>
                            <div className="w-8 h-8 bg-black rounded-full"></div>
                            <div className="w-8 h-8 bg-black rounded-full"></div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-gray-900">COMPANY</h4>
                        <div className="space-y-2">
                            <Link to="/about" className="block text-gray-600 hover:text-black transition-colors">About</Link>
                            <Link to="/features" className="block text-gray-600 hover:text-black transition-colors">Features</Link>
                            <Link to="/works" className="block text-gray-600 hover:text-black transition-colors">Works</Link>
                            <Link to="/career" className="block text-gray-600 hover:text-black transition-colors">Career</Link>
                        </div>
                    </div>

                    {/* Help Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-gray-900">HELP</h4>
                        <div className="space-y-2">
                            <Link to="/customer-support" className="block text-gray-600 hover:text-black transition-colors">Customer Support</Link>
                            <Link to="/delivery-details" className="block text-gray-600 hover:text-black transition-colors">Delivery Details</Link>
                            <Link to="/terms-conditions" className="block text-gray-600 hover:text-black transition-colors">Terms & Conditions</Link>
                            <Link to="/privacy-policy" className="block text-gray-600 hover:text-black transition-colors">Privacy Policy</Link>
                        </div>
                    </div>

                    {/* FAQ & Resources */}
                    <div>
                        <h4 className="font-semibold mb-4 text-gray-900">FAQ</h4>
                        <div className="space-y-2">
                            <Link to="/account" className="block text-gray-600 hover:text-black transition-colors">Account</Link>
                            <Link to="/manage-deliveries" className="block text-gray-600 hover:text-black transition-colors">Manage Deliveries</Link>
                            <Link to="/orders" className="block text-gray-600 hover:text-black transition-colors">Orders</Link>
                            <Link to="/payments" className="block text-gray-600 hover:text-black transition-colors">Payments</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
                    <p>&copy; 2023 Shop.Co. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
