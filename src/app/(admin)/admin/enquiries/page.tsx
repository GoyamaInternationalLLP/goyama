import EnquiriesSection from "@/components/admin/EnquiriesSection";
import { fetchCategories, fetchEnquiries } from "@/lib/api";

const EnquiriesPage = async () => {
  const [enquiries, categories] = await Promise.all([fetchEnquiries(), fetchCategories()]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Enquiries</h1>
          <p className="text-gray-600">View all enquiries asked by people related to your products</p>
        </div>
      </div>
      {enquiries.length === 0 ? (
        <div className="mt-4 text-gray-600">No enquiries found</div>
      ) : (
        <EnquiriesSection
          enquiries={enquiries}
          categories={categories}
        />
      )}
    </div>
  );
};

export default EnquiriesPage;
