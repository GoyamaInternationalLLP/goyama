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
      {/* {category.imageUrl && (
        <Image
          src="/product-hero-bg.jpg"
          alt="Hero Product Bg"
          width={500}
          height={500}
          className="object-cover w-full h-12 md:h-40"
        />
      )} */}

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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 animate-slidedown">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-gray-900">
                  {category.parentId ? category.parent?.name + " > " + category.name : category.name}
                </h1>
              </div>

              {category.description && <p className="text-gray-600 mb-4 text-justify">{category.description}</p>}
            </div>
          </div>
        </div>

        {/* Subcategories (if any) */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 animate-slideup">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Different categories under <span className="bg-goyama-primary text-white px-1">{category.name}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.subcategories.map((subcategory) => (
                <Link
                  href={`/${category.slug}/${subcategory.slug}`}
                  key={subcategory.id}
                  className="hover:-translate-y-2 transition-all hover:shadow-lg"
                >
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="">
                      <Image
                        src={subcategory.imageUrl!}
                        alt={subcategory.name}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover"
                        priority
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{subcategory.name}</h3>
                      {subcategory.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">{subcategory.description}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
