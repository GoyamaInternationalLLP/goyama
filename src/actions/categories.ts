"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all categories with optional pagination and search
export async function getCategories(params?: { page?: number; limit?: number; search?: string }) {
  try {
    const { page = 1, limit = 10, search } = params || {};
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [categories, totalCount] = await Promise.all([
      prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: { products: true },
          },
        },
      }),
      prisma.category.count({ where }),
    ]);

    return {
      success: true,
      data: {
        categories,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
        },
      },
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      error: "Failed to fetch categories",
    };
  }
}

// Get category by ID
export async function getCategoryById(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: true,
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      return {
        success: false,
        error: "Category not found",
      };
    }

    return {
      success: true,
      data: category,
    };
  } catch (error) {
    console.error("Error fetching category:", error);
    return {
      success: false,
      error: "Failed to fetch category",
    };
  }
}

// Create category
export async function createCategory(categoryData: any) {
  try {
    // Check if slug already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug: categoryData.slug },
    });

    if (existingCategory) {
      return {
        success: false,
        error: "Category with this slug already exists",
      };
    }

    const category = await prisma.category.create({
      data: categoryData,
    });

    revalidatePath("/admin/categories");
    revalidatePath("/");

    return {
      success: true,
      data: category,
      message: "Category created successfully",
    };
  } catch (error) {
    console.error("Error creating category:", error);
    return {
      success: false,
      error: "Failed to create category",
    };
  }
}

// Update category
export async function updateCategory(id: string, categoryData: any) {
  try {
    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return {
        success: false,
        error: "Category not found",
      };
    }

    // Check if slug already exists (excluding current category)
    if (categoryData.slug && categoryData.slug !== existingCategory.slug) {
      const slugExists = await prisma.category.findUnique({
        where: { slug: categoryData.slug },
      });

      if (slugExists) {
        return {
          success: false,
          error: "Category with this slug already exists",
        };
      }
    }

    const category = await prisma.category.update({
      where: { id },
      data: categoryData,
    });

    revalidatePath("/admin/categories");
    revalidatePath("/");

    return {
      success: true,
      data: category,
      message: "Category updated successfully",
    };
  } catch (error) {
    console.error("Error updating category:", error);
    return {
      success: false,
      error: "Failed to update category",
    };
  }
}

// Delete category
export async function deleteCategory(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      return {
        success: false,
        error: "Category not found",
      };
    }

    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/");

    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting category:", error);
    return {
      success: false,
      error: "Failed to delete category",
    };
  }
}
