import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { productsApi } from '../api/product';
import ProductCard from '../components/ui/ProductCard';
import welcomeImage from '../assets/welcome_image.jpg';
import casual from '../assets/casual_style.png';
import formal from '../assets/formal_style.png';
import gym from '../assets/gym_style.png';
import party from '../assets/party_style.png';
import versace from '../assets/versace.png';
import prada from '../assets/prada.png';
import calvin from '../assets/calvin_klein.png';
import zara from '../assets/zara.png';
import gucci from '../assets/gucci.png';
import vectorStar from '../assets/star.png';
import { useState } from 'react';

export default function HomePage() {
    const { data: newArrivals } = useQuery({
        queryKey: ['products', 'new-arrivals'],
        queryFn: () => productsApi.getAll({ category: 'new-arrivals' })
    });

    const { data: topSelling } = useQuery({
        queryKey: ['products', 'top-selling'],
        queryFn: () => productsApi.getAll({ category: 'top-selling' })
    });

    const brands = [
        { name: 'VERSACE', logo: versace },
        { name: 'ZARA', logo: zara },
        { name: 'GUCCI', logo: gucci },
        { name: 'PRADA', logo: prada },
        { name: 'Calvin Klein', logo: calvin }
    ];

    const styleCategories = [
        { name: 'Casual', image: casual },
        { name: 'Formal', image: formal },
        { name: 'Party', image: party },
        { name: 'Gym', image: gym }
    ];

    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

    const customerReviews = [
        {
            name: 'Sarah M.',
            rating: 5,
            review: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
        },
        {
            name: 'Alex K.',
            rating: 5,
            review: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable."
        },
        {
            name: 'James L.',
            rating: 5,
            review: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have found Shop.co. The selection is fantastic, and the prices are reasonable."
        },
        {
            name: 'Maria G.',
            rating: 5,
            review: "The customer service at Shop.co is exceptional. They helped me find the perfect outfit for my special event. Highly recommend!"
        },
        {
            name: 'David R.',
            rating: 5,
            review: "Quality fabrics, trendy designs, and affordable prices - Shop.co has it all! My go-to place for all my fashion needs."
        },
        {
            name: 'James L.',
            rating: 5,
            review: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have found Shop.co. The selection is fantastic, and the prices are reasonable."
        },
        {
            name: 'Maria G.',
            rating: 5,
            review: "The customer service at Shop.co is exceptional. They helped me find the perfect outfit for my special event. Highly recommend!"
        },
        {
            name: 'David R.',
            rating: 5,
            review: "Quality fabrics, trendy designs, and affordable prices - Shop.co has it all! My go-to place for all my fashion needs."
        }
    ];

    const nextReview = () => {
        setCurrentReviewIndex((prev) =>
            prev + 1 >= customerReviews.length - 2 ? 0 : prev + 1
        );
    };

    const prevReview = () => {
        setCurrentReviewIndex((prev) =>
            prev - 1 < 0 ? customerReviews.length - 3 : prev - 1
        );
    };

    return (
        <div className="space-y-0">
            {/* Hero Section */}
            <section className="bg-custom-bg relative overflow-hidden">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                        {/* Left Content */}
                        <div className="space-y-8 px-4 py-16 lg:py-20">
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-black leading-[1.1]">
                                FIND CLOTHES<br />
                                THAT MATCHES<br />
                                YOUR STYLE
                            </h1>

                            <p className="text-gray-600 text-base lg:text-lg max-w-screen-md leading-relaxed">
                                Browse through our diverse range of meticulously crafted garments, designed
                                to bring out your individuality and cater to your sense of style.
                            </p>

                            <Link
                                to="/products"
                                className="inline-block bg-black text-white px-14 py-4 rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
                            >
                                Shop Now
                            </Link>

                            {/* Stats */}
                            <div className="flex flex-wrap items-center gap-8 lg:gap-12 pt-8">
                                <div className="text-center lg:text-left">
                                    <div className="text-2xl lg:text-4xl font-bold text-black">200+</div>
                                    <div className="text-gray-600 text-sm lg:text-base">International Brands</div>
                                </div>
                                <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
                                <div className="text-center lg:text-left">
                                    <div className="text-2xl lg:text-4xl font-bold text-black">2,000+</div>
                                    <div className="text-gray-600 text-sm lg:text-base">High-Quality Products</div>
                                </div>
                                <div className="hidden lg:block w-px h-12 bg-gray-300"></div>
                                <div className="text-center lg:text-left">
                                    <div className="text-2xl lg:text-4xl font-bold text-black">30,000+</div>
                                    <div className="text-gray-600 text-sm lg:text-base">Happy Customers</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Image */}
                        <div className="relative h-[700px] px-4 lg:px-0">
                            <img
                                src={welcomeImage}
                                alt="Fashion couple"
                                className="w-full h-full object-cover object-top"
                            />

                            {/* Decorative Star - Top Right */}
                            <img
                                src={vectorStar}
                                alt="Star decoration"
                                className="absolute top-4 right-8 lg:right-16 w-12 h-12 lg:w-24 lg:h-24 object-contain"
                            />

                            {/* Decorative Star - Left Middle */}
                            <img
                                src={vectorStar}
                                alt="Star decoration"
                                className="absolute top-1/2 -left-4 lg:-left-8 w-8 h-8 lg:w-16 lg:h-16 object-contain transform -translate-y-1/2"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Brands Section */}
            <section className="bg-black py-6 -mt-0">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-around items-center gap-8 lg:gap-16">
                        {brands.map((brand) => (
                            <div key={brand.name} className="opacity-80 hover:opacity-100 transition-opacity">
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="h-8 lg:h-8 w-auto object-contain filter brightness-0 invert"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* New Arrivals */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-4">NEW ARRIVALS</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {newArrivals?.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/products?category=new-arrivals"
                        className="border border-gray-300 text-gray-900 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors"
                    >
                        View All
                    </Link>
                </div>
            </section>

            {/* Top Selling */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-4">TOP SELLING</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {topSelling?.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/products?category=top-selling"
                        className="border border-gray-300 text-gray-900 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors"
                    >
                        View All
                    </Link>
                </div>
            </section>

            {/* Browse by Style */}
            <section className="container mx-auto px-4 py-16">
                <div className="bg-custom-bg rounded-3xl p-8 lg:p-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-4">BROWSE BY DRESS STYLE</h2>
                    </div>

                    <div className="grid grid-cols-12 gap-6 h-[578px]">
                        {/* Casual - Top Left (Small) */}
                        <Link
                            to="/products?style=casual"
                            className="col-span-12 md:col-span-5 relative overflow-hidden rounded-2xl group bg-white"
                            style={{ height: '289px' }}
                        >
                            <img
                                src={styleCategories[0].image}
                                alt="Casual"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-6 left-6">
                                <h3 className="text-2xl lg:text-4xl font-bold text-black">Casual</h3>
                            </div>
                        </Link>

                        {/* Formal - Top Right (Wide) */}
                        <Link
                            to="/products?style=formal"
                            className="col-span-12 md:col-span-7 relative overflow-hidden rounded-2xl group bg-white"
                            style={{ height: '289px' }}
                        >
                            <img
                                src={styleCategories[1].image}
                                alt="Formal"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-6 left-6">
                                <h3 className="text-2xl lg:text-4xl font-bold text-black">Formal</h3>
                            </div>
                        </Link>

                        {/* Party - Bottom Left (Wide) */}
                        <Link
                            to="/products?style=party"
                            className="col-span-12 md:col-span-7 relative overflow-hidden rounded-2xl group bg-white"
                            style={{ height: '289px' }}
                        >
                            <img
                                src={styleCategories[2].image}
                                alt="Party"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-6 left-6">
                                <h3 className="text-2xl lg:text-4xl font-bold text-black">Party</h3>
                            </div>
                        </Link>

                        {/* Gym - Bottom Right (Small) */}
                        <Link
                            to="/products?style=gym"
                            className="col-span-12 md:col-span-5 relative overflow-hidden rounded-2xl group bg-white"
                            style={{ height: '289px' }}
                        >
                            <img
                                src={styleCategories[3].image}
                                alt="Gym"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-6 left-6">
                                <h3 className="text-2xl lg:text-4xl font-bold text-black">Gym</h3>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Customer Reviews */}
            <section className="container mx-auto px-4 py-16">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900">OUR HAPPY CUSTOMERS</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={prevReview}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextReview}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="relative overflow-hidden">
                    <div 
                        className="flex transition-transform duration-500 ease-in-out gap-6"
                        style={{ 
                            transform: `translateX(calc(-${currentReviewIndex * 400}px + 50px))`,
                        }}
                    >
                        {customerReviews.map((review, index) => {
                            const position = index - currentReviewIndex;
                            const isVisible = position >= -1 && position <= 3;
                            const isPartialLeft = position === -1;
                            const isPartialRight = position === 3;
                            const isFullyVisible = position >= 0 && position <= 2;
                            
                            return (
                                <div
                                    key={index}
                                    className={`flex-shrink-0 transition-all duration-500 ${
                                        !isVisible 
                                            ? 'opacity-0' 
                                            : isPartialLeft || isPartialRight
                                                ? 'opacity-40 blur-sm scale-95'
                                                : isFullyVisible
                                                    ? 'opacity-100 blur-0 scale-100'
                                                    : 'opacity-100 blur-0 scale-100'
                                    }`}
                                    style={{ 
                                        width: '400px',
                                        height: '240px'
                                    }}
                                >
                                    <div className="bg-white border border-gray-200 rounded-3xl p-8 h-full flex flex-col">
                                        {/* Star Rating */}
                                        <div className="flex mb-3">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                            ))}
                                        </div>
                                        
                                        {/* Reviewer Name with Verified Icon */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <p className="font-bold text-lg text-gray-900">{review.name}</p>
                                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                        
                                        {/* Review Text */}
                                        <p className="text-gray-700 leading-relaxed text-base flex-1 overflow-hidden">
                                            "{review.review}"
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
