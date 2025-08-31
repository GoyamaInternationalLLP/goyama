"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all products with optional pagination, search, and category filter
export async function getProducts(params?: {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  isActive?: boolean;
}) {
  try {
    const { page = 1, limit = 10, search, categoryId, isActive } = params || {};
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      success: true,
      data: {
        products,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
        },
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      success: false,
      error: "Failed to fetch products",
    };
  }
}

// Get product by ID
export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    return {
      success: true,
      data: product,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      success: false,
      error: "Failed to fetch product",
    };
  }
}

// Get products by category slug
export async function getProductsByCategorySlug(categorySlug: string, params?: { page?: number; limit?: number }) {
  try {
    const { page = 1, limit = 10 } = params || {};
    const skip = (page - 1) * limit;

    const category = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    if (!category) {
      return {
        success: false,
        error: "Category not found",
      };
    }

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where: {
          categoryId: category.id,
          isActive: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
      prisma.product.count({
        where: {
          categoryId: category.id,
          isActive: true,
        },
      }),
    ]);

    return {
      success: true,
      data: {
        products,
        category,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
        },
      },
    };
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return {
      success: false,
      error: "Failed to fetch products",
    };
  }
}

// Create product
export async function createProduct(productData: any) {
  try {
    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug: productData.slug },
    });

    if (existingProduct) {
      return {
        success: false,
        error: "Product with this slug already exists",
      };
    }

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: productData.categoryId },
    });

    if (!category) {
      return {
        success: false,
        error: "Category not found",
      };
    }

    const product = await prisma.product.create({
      data: productData,
      include: {
        category: true,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/");

    return {
      success: true,
      data: product,
      message: "Product created successfully",
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      error: "Failed to create product",
    };
  }
}

// Update product
export async function updateProduct(id: string, productData: any) {
  try {
    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    // Check if slug already exists (excluding current product)
    if (productData.slug && productData.slug !== existingProduct.slug) {
      const slugExists = await prisma.product.findUnique({
        where: { slug: productData.slug },
      });

      if (slugExists) {
        return {
          success: false,
          error: "Product with this slug already exists",
        };
      }
    }

    // Verify category exists if categoryId is being updated
    if (productData.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: productData.categoryId },
      });

      if (!category) {
        return {
          success: false,
          error: "Category not found",
        };
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: productData,
      include: {
        category: true,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/");

    return {
      success: true,
      data: product,
      message: "Product updated successfully",
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      error: "Failed to update product",
    };
  }
}

// Delete product
export async function deleteProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");
    revalidatePath("/");

    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      error: "Failed to delete product",
    };
  }
}
