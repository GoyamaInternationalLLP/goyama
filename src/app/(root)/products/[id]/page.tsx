import { getProductById } from "@/actions/products";
import EnquireProductForm from "@/components/EnquireProductForm";
import ProductMediaSlider from "@/components/ProductMediaSlider";
import Image from "next/image";

type ProductDetail = {
  category: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    description: string | null;
    isActive: boolean;
    imageUrl: string | null;
  };
  id: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  title: string;
  description: string | null;
  categoryId: string;
  isActive: boolean;
  images: string[];
  videos: string[];
};

const ProductDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  let prodRes;
  if (id) prodRes = await getProductById(id);

  if (!prodRes?.success || !prodRes.data) {
    return <div>Product not found</div>;
  }

  const product: ProductDetail = prodRes.data;

  const media = [
    ...(product.images?.map((url) => ({ url, type: "image" })) || []),
    ...(product.videos?.map((url) => ({ url, type: "video" })) || []),
  ];

  return (
    <div>
      <Image
        src="/product-hero-bg.jpg"
        alt="Hero Product Bg"
        width={500}
        height={500}
        className="object-cover w-full h-12 md:h-40"
      />
      <div className="p-5 pt-10 md:p-20 md:pt-10">
        <h1 className="text-4xl font-bold text-center">{product?.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
          <div>
            <ProductMediaSlider media={media} />
          </div>

          <div className="my-auto">
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <p className="text-gray-700">{product?.description}</p>
            <p className="text-gray-500 text-sm mt-4">
              Want to know more about this product? Click the button below to get in touch with us!
            </p>
            <EnquireProductForm product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
