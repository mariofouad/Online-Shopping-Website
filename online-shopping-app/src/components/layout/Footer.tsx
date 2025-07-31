import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Twitter, Facebook, Instagram, Github } from 'lucide-react';
import visa from '../../assets/visa_logo.png';
import applePay from '../../assets/apple_pay.png';
import googlePay from '../../assets/google_pay.png';
import payPal from '../../assets/paypal.png';
import masterCard from '../../assets/master_card.png';
import toast from 'react-hot-toast';

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleNewsletterSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            toast.success('Successfully subscribed to newsletter!');
            setEmail('');
        }
    };

    return (
        <div className="relative">
            {/* Background Split - White top, Gray bottom */}
            <div className="bg-white pt-32 pb-16"></div>
            <div className="bg-custom-bg">
                {/* Newsletter Section - Floating */}
                <div className="container mx-auto px-4 relative -top-32 mb-8">
                    <div className="bg-black text-white rounded-3xl shadow-2xl">
                        <div className="px-8 py-12">
                            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                                <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                                    STAY UPTO DATE ABOUT<br />
                                    OUR LATEST OFFERS
                                </h2>
                                <div className="flex flex-col gap-4 w-full lg:w-auto lg:min-w-[400px]">
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="email"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-white"
                                            required
                                        />
                                    </div>
                                    <button
                                        onClick={handleNewsletterSignup}
                                        className="bg-white text-black py-4 px-8 rounded-full hover:bg-gray-100 transition-colors font-medium"
                                    >
                                        Subscribe to Newsletter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Footer */}
                <footer className="pb-12">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
                            {/* Company Info */}
                            <div className="md:col-span-1">
                                <h3 className="text-3xl font-bold mb-6">SHOP.CO</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    We have clothes that suits your style and which you're proud to wear. From women to men.
                                </p>
                                <div className="flex space-x-4">
                                    <div className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
                                        <Twitter className="w-4 h-4" />
                                    </div>
                                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
                                        <Facebook className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
                                        <Instagram className="w-4 h-4" />
                                    </div>
                                    <div className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
                                        <Github className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Company Links */}
                            <div>
                                <h4 className="font-medium mb-6 text-black text-lg tracking-wider">COMPANY</h4>
                                <div className="space-y-4">
                                    <Link to="/about" className="block text-gray-600 hover:text-black transition-colors">About</Link>
                                    <Link to="/features" className="block text-gray-600 hover:text-black transition-colors">Features</Link>
                                    <Link to="/works" className="block text-gray-600 hover:text-black transition-colors">Works</Link>
                                    <Link to="/career" className="block text-gray-600 hover:text-black transition-colors">Career</Link>
                                </div>
                            </div>

                            {/* Help Links */}
                            <div>
                                <h4 className="font-medium mb-6 text-black text-lg tracking-wider">HELP</h4>
                                <div className="space-y-4">
                                    <Link to="/customer-support" className="block text-gray-600 hover:text-black transition-colors">Customer Support</Link>
                                    <Link to="/delivery-details" className="block text-gray-600 hover:text-black transition-colors">Delivery Details</Link>
                                    <Link to="/terms-conditions" className="block text-gray-600 hover:text-black transition-colors">Terms & Conditions</Link>
                                    <Link to="/privacy-policy" className="block text-gray-600 hover:text-black transition-colors">Privacy Policy</Link>
                                </div>
                            </div>

                            {/* FAQ Links */}
                            <div>
                                <h4 className="font-medium mb-6 text-black text-lg tracking-wider">FAQ</h4>
                                <div className="space-y-4">
                                    <Link to="/account" className="block text-gray-600 hover:text-black transition-colors">Account</Link>
                                    <Link to="/manage-deliveries" className="block text-gray-600 hover:text-black transition-colors">Manage Deliveries</Link>
                                    <Link to="/orders" className="block text-gray-600 hover:text-black transition-colors">Orders</Link>
                                    <Link to="/payments" className="block text-gray-600 hover:text-black transition-colors">Payments</Link>
                                </div>
                            </div>

                            {/* Resources */}
                            <div>
                                <h4 className="font-medium mb-6 text-black text-lg tracking-wider">RESOURCES</h4>
                                <div className="space-y-4">
                                    <Link to="/ebooks" className="block text-gray-600 hover:text-black transition-colors">Free eBooks</Link>
                                    <Link to="/development-tutorial" className="block text-gray-600 hover:text-black transition-colors">Development Tutorial</Link>
                                    <Link to="/blog" className="block text-gray-600 hover:text-black transition-colors">How to - Blog</Link>
                                    <Link to="/youtube-playlist" className="block text-gray-600 hover:text-black transition-colors">Youtube Playlist</Link>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="border-t border-gray-200 pt-8">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <p className="text-gray-600">Shop.co © 2000-2023, All Rights Reserved</p>
                                <div className="flex items-center gap-3">
                                    <img src={visa} alt="Visa" className="h-8 w-auto" />
                                    <img src={masterCard} alt="Mastercard" className="h-8 w-auto" />
                                    <img src={payPal} alt="PayPal" className="h-8 w-auto" />
                                    <img src={applePay} alt="Apple Pay" className="h-8 w-auto" />
                                    <img src={googlePay} alt="Google Pay" className="h-8 w-auto" />
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
