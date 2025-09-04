import { getCategories } from "@/actions/categories";
import { getContacts } from "@/actions/contact";
import { getEnquiries } from "@/actions/enquiries";
import { getProducts } from "@/actions/products";
import { FolderOpen, Package } from "lucide-react";
import { FaPhoneAlt } from "react-icons/fa";
import { LuPackageSearch } from "react-icons/lu";
import { Category, Contact, Enquiry, Product } from "../../../../types";
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboard() {
  const [prodRes, catRes, enqRes, conRes] = await Promise.all([
    getProducts({ limit: 5 }),
    getCategories({ limit: 5 }),
    getEnquiries({ limit: 5 }),
    getContacts({ limit: 5 }),
  ]);

  if (!prodRes.success || !catRes.success || !enqRes.success || !conRes.success) {
    return <div className="mt-4 text-red-600">Failed to load data</div>;
  }

  const products = prodRes.data?.products ?? [];
  const categories = catRes.data?.categories ?? [];
  const enquiries = enqRes.data?.enquiries ?? [];
  const contacts = conRes.data?.contacts ?? [];

  const statCards = [
    {
      title: "Total Products",
      value: Array.isArray(products) ? products.length : 0,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Total Categories",
      value: Array.isArray(categories) ? categories.length : 0,
      icon: FolderOpen,
      color: "bg-green-500",
    },
    {
      title: "Total Enquiries",
      value: Array.isArray(enquiries) ? enquiries.length : 0,
      icon: LuPackageSearch,
      color: "bg-yellow-500",
    },
    {
      title: "Total Contact Us Requests",
      value: Array.isArray(contacts) ? contacts.length : 0,
      icon: FaPhoneAlt,
      color: "bg-red-500",
    },
  ];

  if (!products || !categories) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-lg p-6 pr-2"
          >
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr />

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Products</h3>
          </div>
          <div className="p-6">
            {Array.isArray(products) && products.length > 0 ? (
              <div className="space-y-4">
                {products.map((product: Product) => (
                  <div
                    key={product.id}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{product.title}</p>
                      <p className="text-sm text-gray-500">{product.category?.name}</p>
                    </div>
                    <Badge variant={product.isPremium ? "default" : "secondary"}>
                      {product.isPremium ? "Premium" : "Normal"}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No products found</p>
            )}
          </div>
        </div>

        {/* Recent Categories */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Categories</h3>
          </div>
          <div className="p-6">
            {Array.isArray(categories) && categories.length > 0 ? (
              <div className="space-y-4">
                {categories.map((category: Category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{category.name}</p>
                      <p className="text-sm text-gray-500">{category.slug}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No categories found</p>
            )}
          </div>
        </div>

        {/* Recent Product Enquiries */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Product Enquiries</h3>
          </div>
          <div className="p-6">
            {Array.isArray(enquiries) && enquiries.length > 0 ? (
              <div className="space-y-4">
                {enquiries.map((enquiry: Enquiry) => (
                  <div
                    key={enquiry.id}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{enquiry.product!.title}</p>
                      <p className="text-sm text-gray-500">{enquiry.product!.category?.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No categories found</p>
            )}
          </div>
        </div>

        {/* Recent Contacct Us Requests */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Contact Us Requests</h3>
          </div>
          <div className="p-6">
            {Array.isArray(contacts) && contacts.length > 0 ? (
              <div className="space-y-4">
                {contacts.map((contact: Contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No contact requests found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
