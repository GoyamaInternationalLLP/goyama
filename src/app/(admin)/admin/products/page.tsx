import ProductSection from "@/components/admin/ProductSection";
import { fetchCategories, fetchProducts } from "@/lib/api";
import { Plus } from "lucide-react";
import Link from "next/link";

const ProductsPage = async () => {
  const productsResponse = await fetchProducts();
  const categories = await fetchCategories();

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </Link>
      </div>

      <ProductSection
        products={productsResponse.products}
        categories={categories}
      />
    </div>
  );
};

export default ProductsPage;
