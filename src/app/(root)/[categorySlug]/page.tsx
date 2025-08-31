import { fetchProductsByCategory } from "@/lib/api";
import { Category, Product } from "../../../../types";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

const ProductsPage = async ({ params }: { params: Promise<{ categorySlug: string }> }) => {
  const { categorySlug } = await params;

  let productResponse;
  if (categorySlug) {
    productResponse = await fetchProductsByCategory(categorySlug);
  }

  if (!productResponse) {
    return <div>No products found for category: {categorySlug}</div>;
  }

  const products: Product[] = productResponse.products;
  const categoryDetails: Category = productResponse.category;

  if (!categoryDetails) {
    return <div>No category found for slug: {categorySlug}</div>;
  }

  return (
    <div className="container mx-auto pb-8">
      <Image
        src={categoryDetails.imageUrl!}
        alt={categoryDetails?.name}
        width={500}
        height={300}
        className="w-full h-52 object-cover"
      />
      <h1 className="text-4xl font-bold my-7 text-center">Products in {categoryDetails?.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-20 animate-slideup">
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
