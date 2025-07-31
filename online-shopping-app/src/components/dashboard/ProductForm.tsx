import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { X, Plus } from 'lucide-react';
import { productsApi, type Product } from '../../api/product';
import toast from 'react-hot-toast';

interface ProductFormProps {
    product?: Product | null;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        originalPrice: product?.originalPrice || 0,
        category: product?.category || '',
        stock: product?.stock || 0,
        brand: product?.brand || '',
        images: product?.images || [''],
        sizes: product?.sizes || [''],
        colors: product?.colors || ['']
    });

    const isEditing = !!product;

    const createMutation = useMutation({
        mutationFn: (data: Omit<Product, 'id'>) => productsApi.create(data),
        onSuccess: () => {
            toast.success('Product created successfully!');
            onSuccess();
        },
        onError: () => {
            toast.error('Failed to create product');
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
            productsApi.update(id, data),
        onSuccess: () => {
            toast.success('Product updated successfully!');
            onSuccess();
        },
        onError: () => {
            toast.error('Failed to update product');
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const productData = {
            ...formData,
            images: formData.images.filter(img => img.trim() !== ''),
            sizes: formData.sizes.filter(size => size.trim() !== ''),
            colors: formData.colors.filter(color => color.trim() !== ''),
            price: Number(formData.price),
            originalPrice: Number(formData.originalPrice) || undefined,
            stock: Number(formData.stock)
        };

        // Validation
        if (productData.images.length === 0) {
            toast.error('Please add at least one product image');
            return;
        }
        if (productData.sizes.length === 0) {
            toast.error('Please add at least one size');
            return;
        }
        if (productData.colors.length === 0) {
            toast.error('Please add at least one color');
            return;
        }

        if (isEditing) {
            updateMutation.mutate({ id: product.id, data: productData });
        } else {
            createMutation.mutate(productData);
        }
    };

    const handleImageChange = (index: number, value: string) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData({ ...formData, images: newImages });
    };

    const addImageField = () => {
        setFormData({ ...formData, images: [...formData.images, ''] });
    };

    const removeImageField = (index: number) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: newImages });
    };

    const handleSizeChange = (index: number, value: string) => {
        const newSizes = [...formData.sizes];
        newSizes[index] = value;
        setFormData({ ...formData, sizes: newSizes });
    };

    const addSizeField = () => {
        setFormData({ ...formData, sizes: [...formData.sizes, ''] });
    };

    const removeSizeField = (index: number) => {
        const newSizes = formData.sizes.filter((_, i) => i !== index);
        setFormData({ ...formData, sizes: newSizes });
    };

    const handleColorChange = (index: number, value: string) => {
        const newColors = [...formData.colors];
        newColors[index] = value;
        setFormData({ ...formData, colors: newColors });
    };

    const addColorField = () => {
        setFormData({ ...formData, colors: [...formData.colors, ''] });
    };

    const removeColorField = (index: number) => {
        const newColors = formData.colors.filter((_, i) => i !== index);
        setFormData({ ...formData, colors: newColors });
    };

    const categories = [
        'new-arrivals',
        'top-selling'
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-8 border-b border-gray-200">
                    <h2 className="text-2xl font-extrabold text-black">
                        {isEditing ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                            Product Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:bg-white border border-transparent focus:border-gray-200"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:bg-white border border-transparent focus:border-gray-200"
                            required
                        />
                    </div>

                    {/* Price and Original Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                                Price ($)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:bg-white border border-transparent focus:border-gray-200"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                                Original Price ($)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.originalPrice}
                                onChange={(e) => setFormData({ ...formData, originalPrice: parseFloat(e.target.value) })}
                                className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:bg-white border border-transparent focus:border-gray-200"
                            />
                        </div>
                    </div>

                    {/* Category and Stock */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                                Category
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:bg-white border border-transparent focus:border-gray-200"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                                Stock
                            </label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                                className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:bg-white border border-transparent focus:border-gray-200"
                                required
                            />
                        </div>
                    </div>

                    {/* Brand */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                            Brand
                        </label>
                        <input
                            type="text"
                            value={formData.brand}
                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:bg-white border border-transparent focus:border-gray-200"
                        />
                    </div>

                    {/* Sizes */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                            Available Sizes
                        </label>
                        <div className="space-y-3">
                            {formData.sizes.map((size, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={size}
                                        onChange={(e) => handleSizeChange(index, e.target.value)}
                                        placeholder="e.g., S, M, L, XL"
                                        className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:bg-white border border-transparent focus:border-gray-200"
                                    />
                                    {formData.sizes.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeSizeField(index)}
                                            className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addSizeField}
                                className="flex items-center gap-2 text-black hover:bg-gray-100 px-4 py-2 rounded-full transition-colors text-sm font-medium"
                            >
                                <Plus className="w-4 h-4" />
                                Add Another Size
                            </button>
                        </div>
                    </div>

                    {/* Colors */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                            Available Colors
                        </label>
                        <div className="space-y-3">
                            {formData.colors.map((color, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={color}
                                        onChange={(e) => handleColorChange(index, e.target.value)}
                                        placeholder="e.g., Red, Blue, Black, White"
                                        className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:bg-white border border-transparent focus:border-gray-200"
                                    />
                                    {formData.colors.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeColorField(index)}
                                            className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addColorField}
                                className="flex items-center gap-2 text-black hover:bg-gray-100 px-4 py-2 rounded-full transition-colors text-sm font-medium"
                            >
                                <Plus className="w-4 h-4" />
                                Add Another Color
                            </button>
                        </div>
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wider">
                            Product Images (URLs)
                        </label>
                        <div className="space-y-3">
                            {formData.images.map((image, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="url"
                                        value={image}
                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:bg-white border border-transparent focus:border-gray-200"
                                        required={index === 0}
                                    />
                                    {formData.images.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeImageField(index)}
                                            className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addImageField}
                                className="flex items-center gap-2 text-black hover:bg-gray-100 px-4 py-2 rounded-full transition-colors text-sm font-medium"
                            >
                                <Plus className="w-4 h-4" />
                                Add Another Image
                            </button>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={createMutation.isPending || updateMutation.isPending}
                            className="flex-1 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
                        >
                            {createMutation.isPending || updateMutation.isPending
                                ? 'Saving...'
                                : isEditing
                                    ? 'Update Product'
                                    : 'Create Product'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
