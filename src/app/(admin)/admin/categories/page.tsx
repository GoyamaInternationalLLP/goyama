import { getCategories } from "@/actions/categories";
import { CategoriesSection } from "@/components/admin/CategoriesSection";
import { Plus } from "lucide-react";
import Link from "next/link";

const CategoriesPage = async () => {
  const res = await getCategories();

  if (!res.success) {
    return <div className="mt-4 text-red-600">Failed to load categories</div>;
  }

  const categories = res.data?.categories ?? [];

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600">Manage your product categories</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Category</span>
        </Link>
      </div>
      {categories.length === 0 ? (
        <div className="mt-4 text-gray-600">No categories found</div>
      ) : (
        <CategoriesSection categories={categories ?? []} />
      )}
    </div>
  );
};

export default CategoriesPage;
