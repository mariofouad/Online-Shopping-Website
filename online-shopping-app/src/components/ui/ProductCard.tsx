import { Link } from 'react-router-dom';
import type { Product } from '../../api/product';
import { useCartStore } from '../../store/cartStore';
import toast from 'react-hot-toast';

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

    return (
        <Link to={`/products/${product.id}`} className="group block">
            <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
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
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.category}</p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-lg">{formatPrice(product.price)}</span>
                            {/* Add discount logic if needed */}
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>

                    {/* Stock indicator */}
                    {product.stock < 10 && product.stock > 0 && (
                        <p className="text-xs text-orange-600 mt-2">Only {product.stock} left!</p>
                    )}
                    {product.stock === 0 && (
                        <p className="text-xs text-red-600 mt-2">Out of stock</p>
                    )}
                </div>
            </div>
        </Link>
    );
}
