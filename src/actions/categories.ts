"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all main categories with subcategories
export async function getCategories(params?: {
  page?: number;
  limit?: number;
  search?: string;
  includeSubcategories?: boolean;
}) {
  try {
    const { page = 1, limit = 10, search, includeSubcategories = true } = params || {};
    const skip = (page - 1) * limit;

    const where: any = {
      parentId: null, // Only main categories
    };

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
        // skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          subcategories: includeSubcategories
            ? {
                include: {
                  _count: {
                    select: { products: true },
                  },
                },
              }
            : false,
          _count: {
            select: {
              products: true,
              subcategories: true,
            },
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

// Get all categories (main + subcategories) for admin
export async function getAllCategoriesFlat(params?: { page?: number; limit?: number; search?: string }) {
  try {
    const { page = 1, limit = 50, search } = params || {};
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
        // skip,
        take: limit,
        orderBy: [
          { parentId: "asc" }, // Main categories first
          { createdAt: "desc" },
        ],
        include: {
          parent: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          _count: {
            select: {
              products: true,
              subcategories: true,
            },
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
    console.error("Error fetching all categories:", error);
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
        parent: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        subcategories: {
          include: {
            _count: {
              select: { products: true },
            },
          },
        },
        products: true,
        _count: {
          select: {
            products: true,
            subcategories: true,
          },
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

// Get category by slug with all products (including from subcategories)
export async function getCategoryBySlug(slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        subcategories: {
          include: {
            products: {
              orderBy: { createdAt: "desc" },
            },
            _count: {
              select: { products: true },
            },
          },
        },
        products: {
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: {
            products: true,
            subcategories: true,
          },
        },
      },
    });

    if (!category) {
      return {
        success: false,
        error: "Category not found",
      };
    }

    // Combine products from main category and all subcategories
    const allProducts = [...category.products, ...category.subcategories.flatMap((sub) => sub.products)];

    return {
      success: true,
      data: {
        ...category,
        allProducts,
      },
    };
  } catch (error) {
    console.error("Error fetching category:", error);
    return {
      success: false,
      error: "Failed to fetch category",
    };
  }
}

// Get main categories for dropdown/select
export async function getMainCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null,
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
      orderBy: { name: "asc" },
    });

    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    console.error("Error fetching main categories:", error);
    return {
      success: false,
      error: "Failed to fetch main categories",
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

    // If parentId is provided, verify parent exists
    if (categoryData.parentId) {
      const parentCategory = await prisma.category.findUnique({
        where: { id: categoryData.parentId },
      });

      if (!parentCategory) {
        return {
          success: false,
          error: "Parent category not found",
        };
      }
    }

    const category = await prisma.category.create({
      data: categoryData,
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
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

    // If parentId is provided, verify parent exists and prevent circular reference
    if (categoryData.parentId) {
      if (categoryData.parentId === id) {
        return {
          success: false,
          error: "Category cannot be its own parent",
        };
      }

      const parentCategory = await prisma.category.findUnique({
        where: { id: categoryData.parentId },
      });

      if (!parentCategory) {
        return {
          success: false,
          error: "Parent category not found",
        };
      }

      // Check if the parent is a subcategory of current category (prevent circular reference)
      if (parentCategory.parentId === id) {
        return {
          success: false,
          error: "Cannot create circular reference",
        };
      }
    }

    const category = await prisma.category.update({
      where: { id },
      data: categoryData,
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
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
          select: {
            products: true,
            subcategories: true,
          },
        },
      },
    });

    if (!category) {
      return {
        success: false,
        error: "Category not found",
      };
    }

    if (category._count.products > 0) {
      return {
        success: false,
        error: "Cannot delete category with existing products",
      };
    }

    if (category._count.subcategories > 0) {
      return {
        success: false,
        error: "Cannot delete category with subcategories",
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
