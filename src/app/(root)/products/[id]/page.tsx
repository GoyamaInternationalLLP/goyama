import { fetchProductById } from "@/lib/api";
import { Product } from "../../../../../types";
import ProductMediaSlider, { MediaItem, MediaSliderProps } from "@/components/ProductMediaSlider";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TbHandFinger } from "react-icons/tb";
import EnquireProductForm from "@/components/EnquireProductForm";

const ProductDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  let product: Product | null = null;
  if (id) product = await fetchProductById(id);

  if (!id || !product) {
    return <div>Product not found</div>;
  }

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
