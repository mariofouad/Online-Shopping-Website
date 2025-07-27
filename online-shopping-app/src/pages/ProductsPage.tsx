import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { productsApi } from '../api/product';
import ProductCard from '../components/ui/ProductCard';

export default function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

    const searchQuery = searchParams.get('search') || '';
    const categoryQuery = searchParams.get('category') || '';

    const { data: products, isLoading } = useQuery({
        queryKey: ['products', categoryQuery, searchQuery],
        queryFn: () => productsApi.getAll({
            category: categoryQuery || undefined,
            search: searchQuery || undefined
        })
    });

    const categories = [
        'T-shirts',
        'Shorts',
        'Shirts',
        'Hoodie',
        'Jeans',
        'New Arrivals',
        'Top Selling'
    ];

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        const newParams = new URLSearchParams(searchParams);
        if (category) {
            newParams.set('category', category);
        } else {
            newParams.delete('category');
        }
        setSearchParams(newParams);
    };

    const clearFilters = () => {
        setSelectedCategory('');
        setPriceRange({ min: 0, max: 1000 });
        setSearchParams({});
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">Filters</h3>
                        <button
                            onClick={clearFilters}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Clear All
                        </button>
                    </div>

                    {/* Categories */}
                    <div className="mb-6">
                        <h4 className="font-medium mb-3">Categories</h4>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <label key={category} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategory === category.toLowerCase().replace(' ', '-')}
                                        onChange={() => handleCategoryChange(
                                            selectedCategory === category.toLowerCase().replace(' ', '-')
                                                ? ''
                                                : category.toLowerCase().replace(' ', '-')
                                        )}
                                        className="mr-2"
                                    />
                                    <span className="text-sm">{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                        <h4 className="font-medium mb-3">Price Range</h4>
                        <div className="space-y-2">
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                value={priceRange.max}
                                onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                                className="w-full"
                            />
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>${priceRange.min}</span>
                                <span>${priceRange.max}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">
                            {searchQuery ? `Search results for "${searchQuery}"` : 'All Products'}
                        </h1>
                        <p className="text-gray-600">
                            Showing {products?.length || 0} results
                        </p>
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg"
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Empty State */}
                {products?.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">No products found.</p>
                        <button
                            onClick={clearFilters}
                            className="mt-4 text-black hover:underline"
                        >
                            Clear filters to see all products
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
