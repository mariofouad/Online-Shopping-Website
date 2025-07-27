import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { productsApi } from '../api/product';
import ProductCard from '../components/ui/ProductCard';
import welcomeImage from '../assets/welcome_image.jpg';



export default function HomePage() {
    const { data: newArrivals } = useQuery({
        queryKey: ['products', 'new-arrivals'],
        queryFn: () => productsApi.getAll({ category: 'new-arrivals' })
    });

    const { data: topSelling } = useQuery({
        queryKey: ['products', 'top-selling'],
        queryFn: () => productsApi.getAll({ category: 'top-selling' })
    });

    const brands = ['VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein'];

    const styleCategories = [
        { name: 'Casual', image: '/casual-style.jpg' },
        { name: 'Formal', image: '/formal-style.jpg' },
        { name: 'Party', image: '/party-style.jpg' },
        { name: 'Gym', image: '/gym-style.jpg' }
    ];

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
        }
    ];

    return (
        <div className="space-y-20">
            {/* Hero Section */}
            <section className="bg-custom-bg px-8 relative overflow-hidden">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-full space-y-6">
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            FIND CLOTHES<br />
                            THAT MATCHES<br />
                            YOUR STYLE
                        </h1>
                        <p className="text-gray-600 text-lg max-w-md">
                            Browse through our diverse range of meticulously crafted garments, designed
                            to bring out your individuality and cater to your sense of style.
                        </p>
                        <Link
                            to="/products"
                            className="inline-block bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                            Shop Now
                        </Link>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 pt-8">
                            <div>
                                <div className="text-3xl font-bold">200+</div>
                                <div className="text-gray-600">International Brands</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">2,000+</div>
                                <div className="text-gray-600">High-Quality Products</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">30,000+</div>
                                <div className="text-gray-600">Happy Customers</div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <img
                            src={welcomeImage}
                            alt="Fashion couple"
                            className="w-full h-auto"
                        />
                        {/* Decorative elements */}
                        <svg
                            className="absolute -top-8 -right-8 w-24 h-24 text-black"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>

                        <svg
                            className="absolute top-1/2 -left-12 w-16 h-16 text-black transform -rotate-12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>


                    </div>
                </div>
            </section>

            {/* Brands Section */}
            <section className="bg-black py-8">
                <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
                    {brands.map((brand) => (
                        <div key={brand} className="text-white text-2xl font-bold opacity-80 hover:opacity-100 transition-opacity">
                            {brand}
                        </div>
                    ))}
                </div>
            </section>

            {/* New Arrivals */}
            <section>
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">NEW ARRIVALS</h2>
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
            <section>
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">TOP SELLING</h2>
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
            <section className="bg-gray-50 rounded-3xl p-8 lg:p-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">BROWSE BY DRESS STYLE</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {styleCategories.map((category, index) => (
                        <Link
                            key={category.name}
                            to={`/products?style=${category.name.toLowerCase()}`}
                            className={`relative overflow-hidden rounded-2xl group ${index === 0 || index === 3 ? 'aspect-[4/3]' : 'aspect-[3/4]'
                                }`}
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                            <div className="absolute top-6 left-6">
                                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Customer Reviews */}
            <section>
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">OUR HAPPY CUSTOMERS</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {customerReviews.map((review, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6">
                            <div className="flex mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-4">{review.review}</p>
                            <p className="font-medium text-gray-900">{review.name}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
