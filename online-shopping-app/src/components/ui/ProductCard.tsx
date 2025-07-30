import { Link } from 'react-router-dom';
import type { Product } from '../../api/product';
import { useCartStore } from '../../store/cartStore';
import toast from 'react-hot-toast';
import { Star } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCartStore();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.images[0]
        });

        toast.success('Added to cart!');
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    // Calculate discount percentage
    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    // Default rating if not provided
    const rating = product.rating || 3.5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
        <Link to={`/products/${product.id}`} className="group block">
            <div className="bg-white rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Product Image */}
                <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                        src={product.images[0] || '/placeholder-product.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Product Info */}
                <div className="p-4">
                    <h3 className="font-extrabold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < fullStars
                                        ? 'text-yellow-400 fill-current'
                                        : i === fullStars && hasHalfStar
                                            ? 'text-yellow-400 fill-current opacity-50'
                                            : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-600">{rating}/5</span>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-center gap-3 mb-4">
                        <span className="font-bold text-2xl text-black">{formatPrice(product.price)}</span>

                        {product.originalPrice && product.originalPrice > product.price && (
                            <>
                                <span className="text-2xl text-gray-400 line-through font-bold">
                                    {formatPrice(product.originalPrice)}
                                </span>
                                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                                    -{discountPercentage}%
                                </span>
                            </>
                        )}
                    </div>

                    {/* Button and Stock Row */}
                    <div className="flex items-center justify-between">
                        {/* Stock indicator */}
                        <div className="flex-1">
                            {product.stock < 10 && product.stock > 0 && (
                                <p className="text-xs font-extrabold text-orange-600">Only {product.stock} left!</p>
                            )}
                            {product.stock === 0 && (
                                <p className="text-xs font-extrabold text-red-600">Out of stock</p>
                            )}
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors ml-auto"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
