import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, ArrowLeft, Package, TrendingUp, AlertTriangle } from 'lucide-react';
import { productsApi, type Product } from '../api/product';
import ProductForm from '../components/dashboard/ProductForm';
import toast from 'react-hot-toast';

export default function DashboardPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const queryClient = useQueryClient();

    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => productsApi.getAll()
    });

    const deleteMutation = useMutation({
        mutationFn: productsApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product deleted successfully!');
        },
        onError: () => {
            toast.error('Failed to delete product');
        }
    });

    const filteredProducts = products?.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleDelete = async (productId: string, productName: string) => {
        if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
            deleteMutation.mutate(productId);
        }
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingProduct(null);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                title="Back to Home"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </Link>
                            <div>
                                <h1 className="text-4xl font-extrabold text-black mb-2">PRODUCT DASHBOARD</h1>
                                <p className="text-gray-600 text-lg">Manage your products efficiently</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-3 font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            Add New Product
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-3xl border border-gray-200 p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-black rounded-full">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-black">{products?.length || 0}</h3>
                                <p className="text-gray-600 font-medium">Total Products</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-200 p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-green-100 rounded-full">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-black">
                                    {new Set(products?.map(p => p.category)).size || 0}
                                </h3>
                                <p className="text-gray-600 font-medium">Categories</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-200 p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-red-100 rounded-full">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-black">
                                    {products?.filter(p => p.stock < 10).length || 0}
                                </h3>
                                <p className="text-gray-600 font-medium">Low Stock</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-3xl border border-gray-200 p-6 mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-black focus:bg-white border border-transparent focus:border-gray-200"
                        />
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-black uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-black uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-black uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-black uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-black uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredProducts?.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={product.images[0] || '/placeholder-product.jpg'}
                                                    alt={product.name}
                                                    className="w-12 h-12 object-cover rounded-lg"
                                                />
                                                <div>
                                                    <h3 className="font-bold text-black">{product.name}</h3>
                                                    <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-lg text-black">{formatPrice(product.price)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.stock < 10
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-green-100 text-green-800'
                                                }`}>
                                                {product.stock} units
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                                                    title="Edit Product"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id, product.name)}
                                                    disabled={deleteMutation.isPending}
                                                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                                                    title="Delete Product"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredProducts?.length === 0 && (
                        <div className="text-center py-16">
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-600 mb-6">
                                {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first product.'}
                            </p>
                            {!searchTerm && (
                                <button
                                    onClick={() => setIsFormOpen(true)}
                                    className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
                                >
                                    Add Product
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Product Form Modal */}
            {isFormOpen && (
                <ProductForm
                    product={editingProduct}
                    onClose={handleCloseForm}
                    onSuccess={() => {
                        handleCloseForm();
                        queryClient.invalidateQueries({ queryKey: ['products'] });
                    }}
                />
            )}
        </div>
    );
}
