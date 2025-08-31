import ProductForm from "@/components/admin/ProductForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetchProductById } from "@/lib/api";

const UpdateProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  if (!id) return <div>Loading...</div>;

  let product;
  if (id) product = await fetchProductById(id);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList className="text-2xl font-bold">
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">Update Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProductForm
        type="edit"
        productData={product}
      />
    </div>
  );
};

export default UpdateProductPage;
