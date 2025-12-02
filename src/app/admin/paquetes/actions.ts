"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 80);
}

export async function createPackageCategory(formData: FormData) {
  const name = (formData.get("name") ?? "").toString().trim();
  const description = (formData.get("description") ?? "").toString().trim();
  const orderRaw = (formData.get("order") ?? "").toString().trim();

  if (!name) {
    throw new Error("El nombre de la categoría es obligatorio.");
  }

  const slug = slugify(name);
  const order = orderRaw ? Number(orderRaw) : 0;

  await prisma.packageCategory.create({
    data: {
      name,
      slug,
      description: description || null,
      order: Number.isNaN(order) ? 0 : order,
    },
  });

  revalidatePath("/admin/paquetes");
  revalidatePath("/paquetes");
  redirect("/admin/paquetes");
}

export async function deletePackageCategory(formData: FormData) {
  const idRaw = (formData.get("categoryId") ?? "").toString().trim();
  const id = Number(idRaw);

  if (!idRaw || Number.isNaN(id)) {
    throw new Error("ID de categoría inválido.");
  }

  try {
    await prisma.packageCategory.delete({
      where: { id },
    });
  } catch (err) {
    console.error("Error al eliminar categoría de paquetes:", err);
  }

  revalidatePath("/admin/paquetes");
  revalidatePath("/admin/paquetes/categorias");
}

export async function createPackage(formData: FormData) {
  const title = (formData.get("title") ?? "").toString().trim();
  const shortDescription = (formData.get("shortDescription") ?? "")
    .toString()
    .trim();
  const description = (formData.get("description") ?? "").toString().trim();
  const categoryIdRaw = (formData.get("categoryId") ?? "").toString().trim();
  const priceFromRaw = (formData.get("priceFrom") ?? "").toString().trim();
  const isActiveRaw = formData.get("isActive");
  const orderRaw = (formData.get("order") ?? "").toString().trim();

  if (!title) {
    throw new Error("El título del paquete es obligatorio.");
  }
  if (!categoryIdRaw) {
    throw new Error("Debes elegir una categoría.");
  }

  const slug = slugify(title);
  const categoryId = Number(categoryIdRaw);
  const priceFrom = priceFromRaw ? Number(priceFromRaw) : null;
  const isActive = isActiveRaw === "on";
  const order = orderRaw ? Number(orderRaw) : 0;

  await prisma.package.create({
    data: {
      title,
      slug,
      shortDescription: shortDescription || null,
      description: description || null,
      priceFrom: priceFrom && !Number.isNaN(priceFrom) ? priceFrom : null,
      isActive,
      order: Number.isNaN(order) ? 0 : order,
      categoryId,
    },
  });

  revalidatePath("/admin/paquetes");
  revalidatePath("/paquetes");
  redirect("/admin/paquetes");
}

export async function updatePackage(formData: FormData) {
  const packageIdRaw = (formData.get("packageId") ?? "").toString().trim();
  const title = (formData.get("title") ?? "").toString().trim();
  const shortDescription = (formData.get("shortDescription") ?? "")
    .toString()
    .trim();
  const description = (formData.get("description") ?? "").toString().trim();
  const categoryIdRaw = (formData.get("categoryId") ?? "").toString().trim();
  const priceFromRaw = (formData.get("priceFrom") ?? "").toString().trim();
  const isActiveRaw = formData.get("isActive");
  const orderRaw = (formData.get("order") ?? "").toString().trim();

  const packageId = Number(packageIdRaw);
  if (!packageIdRaw || Number.isNaN(packageId)) {
    throw new Error("ID de paquete inválido.");
  }
  if (!title) {
    throw new Error("El título del paquete es obligatorio.");
  }
  if (!categoryIdRaw) {
    throw new Error("Debes elegir una categoría.");
  }

  const categoryId = Number(categoryIdRaw);
  const priceFrom = priceFromRaw ? Number(priceFromRaw) : null;
  const isActive = isActiveRaw === "on";
  const order = orderRaw ? Number(orderRaw) : 0;

  await prisma.package.update({
    where: { id: packageId },
    data: {
      title,
      shortDescription: shortDescription || null,
      description: description || null,
      categoryId,
      priceFrom: priceFrom && !Number.isNaN(priceFrom) ? priceFrom : null,
      isActive,
      order: Number.isNaN(order) ? 0 : order,
    },
  });

  revalidatePath("/admin/paquetes");
  revalidatePath("/paquetes");
  redirect("/admin/paquetes");
}