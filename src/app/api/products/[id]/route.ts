import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        images: {
          orderBy: { isPrimary: "desc" },
        },
        videos: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, description, categoryId, isActive, images = [], videos = [] } = body;

    // Delete existing images and videos
    await prisma.productImage.deleteMany({
      where: { productId: params.id },
    });

    await prisma.productVideo.deleteMany({
      where: { productId: params.id },
    });

    // Update product with new data
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        description,
        categoryId,
        isActive,
        images: {
          create: images.map((img: any, index: number) => ({
            imageUrl: img.imageUrl,
            altText: img.altText || title,
            isPrimary: index === 0,
          })),
        },
        videos: {
          create: videos.map((video: any) => ({
            videoUrl: video.videoUrl,
            thumbnailUrl: video.thumbnailUrl,
            title: video.title || title,
          })),
        },
      },
      include: {
        category: true,
        images: true,
        videos: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
