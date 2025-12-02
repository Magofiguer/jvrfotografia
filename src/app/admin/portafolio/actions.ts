"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import fs from "node:fs";
import path from "node:path";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 80);
}

/**
 * Crear categoría de portafolio
 */
export async function createPortfolioCategory(formData: FormData) {
  const name = (formData.get("name") ?? "").toString().trim();
  const description = (formData.get("description") ?? "").toString().trim();
  const orderRaw = (formData.get("order") ?? "").toString().trim();

  if (!name) {
    throw new Error("El nombre de la categoría es obligatorio.");
  }

  const slug = slugify(name);
  const order = orderRaw ? Number(orderRaw) : 0;

  await prisma.portfolioCategory.create({
    data: {
      name,
      slug,
      description: description || null,
      order: Number.isNaN(order) ? 0 : order,
    },
  });

  revalidatePath("/admin/portafolio/categorias");
  revalidatePath("/admin/portafolio");
  redirect("/admin/portafolio/categorias");
}
export async function updatePortfolioAlbum(formData: FormData) {
  const albumIdRaw = (formData.get("albumId") ?? "").toString().trim();
  const title = (formData.get("title") ?? "").toString().trim();
  const description = (formData.get("description") ?? "").toString().trim();
  const dateRaw = (formData.get("date") ?? "").toString().trim();
  const categoryIdRaw = (formData.get("categoryId") ?? "").toString().trim();
  const orderRaw = (formData.get("order") ?? "").toString().trim();
  const isPublishedRaw = formData.get("isPublished");

  const albumId = Number(albumIdRaw);
  if (!albumIdRaw || Number.isNaN(albumId)) {
    throw new Error("ID de álbum inválido.");
  }
  if (!title) {
    throw new Error("El título del álbum es obligatorio.");
  }

  const categoryId = categoryIdRaw ? Number(categoryIdRaw) : null;
  const order = orderRaw ? Number(orderRaw) : 0;
  const dateValue = dateRaw ? new Date(`${dateRaw}T00:00:00`) : null;
  const isPublished = isPublishedRaw === "on";

  await prisma.portfolioAlbum.update({
    where: { id: albumId },
    data: {
      title,
      description: description || null,
      date: dateValue,
      categoryId: categoryId ?? undefined,
      order: Number.isNaN(order) ? 0 : order,
      isPublished,
    },
  });

  revalidatePath("/admin/portafolio");
  revalidatePath("/portafolio");
  redirect("/admin/portafolio");
}
export async function deletePortfolioCategory(formData: FormData) {
  const idRaw = (formData.get("categoryId") ?? "").toString().trim();
  const id = Number(idRaw);

  if (!idRaw || Number.isNaN(id)) {
    throw new Error("ID de categoría inválido.");
  }

  try {
    await prisma.portfolioCategory.delete({
      where: { id },
    });
  } catch (err) {
    console.error("Error al eliminar categoría de portafolio:", err);
    // Opcional: aquí podríamos manejar el caso de que tenga álbumes ligados
    // por ahora sólo log.
  }

  revalidatePath("/admin/portafolio");
  revalidatePath("/admin/portafolio/categorias");
}

/**
 * Crear álbum de portafolio
 */
export async function createPortfolioAlbum(formData: FormData) {
  const title = (formData.get("title") ?? "").toString().trim();
  const description = (formData.get("description") ?? "").toString().trim();
  const dateRaw = (formData.get("date") ?? "").toString().trim();
  const categoryIdRaw = (formData.get("categoryId") ?? "").toString().trim();
  const isPublishedRaw = formData.get("isPublished");

  if (!title) {
    throw new Error("El título del álbum es obligatorio.");
  }

  if (!categoryIdRaw) {
    throw new Error("Debes seleccionar una categoría.");
  }

  const slug = slugify(title);
  const categoryId = Number(categoryIdRaw);
  const isPublished = isPublishedRaw === "on";
  const date = dateRaw ? new Date(dateRaw) : null;

  await prisma.portfolioAlbum.create({
    data: {
      title,
      slug,
      description: description || null,
      date,
      categoryId,
      isPublished,
    },
  });

  revalidatePath("/admin/portafolio");
  redirect("/admin/portafolio");
}
export async function deletePortfolioAlbum(formData: FormData) {
  const idRaw = (formData.get("albumId") ?? "").toString().trim();
  const albumId = Number(idRaw);

  if (!idRaw || Number.isNaN(albumId)) {
    throw new Error("ID de álbum inválido.");
  }

  // 1) Traer imágenes ligadas al álbum
  const images = await prisma.portfolioImage.findMany({
    where: { albumId },
  });

  // 2) Borrar archivos físicos (si la URL apunta a /uploads/portfolio/...)
  for (const img of images) {
    if (!img.url) continue;

    // Quitamos / inicial si lo tiene
    const relative = img.url.replace(/^\/+/, "");
    const fullPath = path.join(process.cwd(), "public", relative);

    try {
      await fs.promises.unlink(fullPath);
    } catch (err) {
      console.warn("No se pudo borrar archivo de imagen:", fullPath, err);
    }
  }

  // Opcional: borrar carpeta del álbum si usas /uploads/portfolio/{albumId}
  const albumDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "portfolio",
    String(albumId),
  );
  try {
    await fs.promises.rm(albumDir, { recursive: true, force: true });
  } catch (err) {
    console.warn("No se pudo borrar carpeta de álbum:", albumDir, err);
  }

  // 3) Borrar registros de DB
  await prisma.portfolioImage.deleteMany({
    where: { albumId },
  });

  await prisma.portfolioAlbum.delete({
    where: { id: albumId },
  });

  // 4) Revalidar vistas
  revalidatePath("/admin/portafolio");
  revalidatePath("/portafolio");
}