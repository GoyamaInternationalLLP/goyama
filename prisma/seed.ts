import { hashPassword } from "../src/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hashPassword("admin123");

  const admin = await prisma.user.upsert({
    where: { email: "admin@goyama.com" },
    update: {},
    create: {
      email: "admin@goyama.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create sample categories
  const quartzBasicSeriesCategory = await prisma.category.upsert({
    where: { slug: "quartzBasicSeries" },
    update: {},
    create: {
      name: "Quartz Basic Series",
      slug: "quartzBasicSeries",
      description: "Premium engineered quartz slabs for countertops and surfaces",
    },
  });

  const flyAshCategory = await prisma.category.upsert({
    where: { slug: "fly-ash" },
    update: {},
    create: {
      name: "Fly Ash",
      slug: "fly-ash",
      description: "High-quality Class F fly ash for construction applications",
    },
  });

  const marbleCategory = await prisma.category.upsert({
    where: { slug: "marble" },
    update: {},
    create: {
      name: "Marble",
      slug: "marble",
      description: "Natural marble slabs and tiles",
    },
  });

  const onyxCategory = await prisma.category.upsert({
    where: { slug: "onyx" },
    update: {},
    create: {
      name: "Onyx",
      slug: "onyx",
      description: "Luxurious onyx stone slabs",
    },
  });

  // Create sample products
  await prisma.product.upsert({
    where: { slug: "calacatta-gold-quartz" },
    update: {},
    create: {
      title: "Calacatta Gold Quartz",
      slug: "calacatta-gold-quartz",
      description:
        "Stunning Calacatta Gold quartz with dramatic veining and luxurious appearance. Perfect for kitchen countertops and bathroom vanities.",
      categoryId: quartzBasicSeriesCategory.id,
      images: {
        create: [
          {
            imageUrl: "/5CalacattaGold.png",
            altText: "Calacatta Gold Quartz Slab",
            isPrimary: true,
          },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "class-f-fly-ash" },
    update: {},
    create: {
      title: "Class F Fly Ash",
      slug: "class-f-fly-ash",
      description: "High-quality Class F fly ash suitable for concrete applications and construction projects.",
      categoryId: flyAshCategory.id,
      images: {
        create: [
          {
            imageUrl: "/flyash.webp",
            altText: "Class F Fly Ash",
            isPrimary: true,
          },
        ],
      },
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
