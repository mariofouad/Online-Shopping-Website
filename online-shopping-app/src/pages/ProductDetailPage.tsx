import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Star, Plus, Minus } from 'lucide-react';
import { productsApi } from '../api/product';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const { addItem } = useCartStore();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getById(id!),
    enabled: !!id
  });

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0]
      });
    }
    
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
        <p className="text-gray-600">The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.images[selectedImage] || '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {product.images.length > 1 && (
          <div className="flex gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square w-20 bg-gray-100 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-black' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-gray-600">4.5/5</span>
            </div>
          </div>
          <p className="text-3xl font-bold">${product.price}</p>
        </div>

        <p className="text-gray-600">{product.description}</p>

        {/* Size Selection */}
        <div>
          <h3 className="font-medium mb-3">Select Size</h3>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-lg ${
                  selectedSize === size
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-gray-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </button>
        </div>

        {/* Product Details */}
        <div className="border-t pt-6">
          <h3 className="font-medium mb-3">Product Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span>{product.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Stock:</span>
              <span>{product.stock} available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
