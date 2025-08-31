"use client";

import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteCategory } from "@/lib/api";
import { Edit, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Category } from "../../../types";
import { Button, buttonVariants } from "../ui/button";
import { toast } from "sonner";
import LoadingSpinner from "../LoadingSpinner";
import { useRouter } from "next/navigation";

export const CategoriesSection = ({ categories }: { categories: Category[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        setLoading(true);
        await deleteCategory(id);
        toast.success("Category deleted successfully");
        router.refresh();
      } catch (error: any) {
        console.error("Failed to delete category:", error);
        toast.error(error.response?.data?.error || "Failed to delete category");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="mt-5 flex flex-col gap-7">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
          <LoadingSpinner />
        </div>
      )}
      {/* Search Bar */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <Input
          type="text"
          placeholder="Search categories..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center">
                      {category.imageUrl && (
                        <img
                          className="h-10 w-10 rounded-lg object-cover mr-3"
                          src={category.imageUrl}
                          alt={category.name}
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        <div className="text-sm text-gray-500 truncate w-28">{category.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell>{category._count?.products || 0}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        category.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {category.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/categories/${category.id}`}
                      className={`!text-blue-600 hover:text-blue-900 bg-transparent hover:!bg-blue-200 ${buttonVariants()}`}
                    >
                      <Edit size={16} />
                    </Link>
                    <Button
                      onClick={() => handleDelete(category.id)}
                      className="ml-2 text-red-600 hover:text-red-900 bg-transparent hover:bg-red-200"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
