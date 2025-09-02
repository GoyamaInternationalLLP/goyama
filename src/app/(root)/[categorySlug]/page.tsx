import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategorySlug } from "@/actions/products";
import { getCategoryBySlug } from "@/actions/categories";
import { ChevronRight, Home, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CategoryWithSubcategories {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
  parentId: string | null;
  parent?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  subcategories: Array<{
    id: string;
    name: string;
    slug: string;
    _count: {
      products: number;
    };
  }>;
  _count: {
    products: number;
    subcategories: number;
  };
  allProducts: ProductWithCategory[];
  createdAt: Date;
  updatedAt: Date;
}

interface ProductWithCategory {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  images: string[];
  videos: string[];
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
    slug: string;
    parentId: string | null;
    parent?: {
      id: string;
      name: string;
      slug: string;
    } | null;
  };
}

const ProductsPage = async ({ params }: { params: Promise<{ categorySlug: string }> }) => {
  const { categorySlug } = await params;

  // Get category details with subcategories
  const categoryResponse = await getCategoryBySlug(categorySlug);

  if (!categoryResponse?.success) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Category Not Found</h1>
        <p className="text-gray-600 mt-2">No category found for: {categorySlug}</p>
        <Link
          href="/"
          className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  const category = categoryResponse.data;

  if (!category) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Category Not Found</h1>
        <p className="text-gray-600 mt-2">No category found for: {categorySlug}</p>
        <Link
          href="/"
          className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  const allProducts = category.allProducts || [];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Image */}
      {category.imageUrl && (
        <div className="relative h-64 w-full">
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link
            href="/"
            className="hover:text-blue-600 flex items-center"
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />

          {category.parent && (
            <>
              <Link
                href={`/${category.parent.slug}`}
                className="hover:text-blue-600"
              >
                {category.parent.name}
              </Link>
              <ChevronRight className="w-4 h-4" />
            </>
          )}

          <span className="text-gray-900 font-medium">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-gray-900">
                  {category.parentId ? category.parent?.name + " > " + category.name : category.name}
                </h1>
                {category.parentId && <Badge variant="secondary">Subcategory</Badge>}
              </div>

              {category.description && <p className="text-gray-600 mb-4 max-w-3xl">{category.description}</p>}

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Package className="w-4 h-4 mr-1" />
                  {allProducts.length} Product{allProducts.length !== 1 ? "s" : ""}
                </span>
                {category._count.subcategories > 0 && (
                  <span>
                    {category._count.subcategories} Subcategor{category._count.subcategories !== 1 ? "ies" : "y"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Subcategories (if any) */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Subcategories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.subcategories.map((subcategory) => (
                <Link
                  key={subcategory.id}
                  href={`/${subcategory.slug}`}
                  className="group p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200"
                >
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">{subcategory.name}</h3>
                  <p className="text-sm text-gray-500">
                    {subcategory._count.products} product{subcategory._count.products !== 1 ? "s" : ""}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {allProducts.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                All Products
                {category.parentId ? ` in ${category.name}` : ` in ${category.name} and its subcategories`}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allProducts.map((product) => (
                <div
                  key={product.id}
                  className="group"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      {product.images && product.images.length > 0 && (
                        <div className="aspect-w-1 aspect-h-1 w-full">
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            width={300}
                            height={300}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{product.title}</h3>
                        {product.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Show which subcategory this product belongs to if viewing a main category */}
                  {!category.parentId && (product as any).categoryId !== category.id && (
                    <div className="mt-2">
                      <Badge
                        variant="outline"
                        className="text-xs"
                      >
                        Subcategory Product
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Yet</h3>
            <p className="text-gray-600">There are no products in this category at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
