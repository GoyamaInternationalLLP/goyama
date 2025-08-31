import CategoryForm from "@/components/admin/CategoryForm";
import { fetchCategoryById } from "@/lib/api";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const UpdateCategoryPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  let category;
  if (id) category = await fetchCategoryById(id);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList className="text-2xl font-bold">
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/categories">Categories</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">Update Category</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <CategoryForm
        type="edit"
        categoryData={category}
      />
    </div>
  );
};

export default UpdateCategoryPage;
