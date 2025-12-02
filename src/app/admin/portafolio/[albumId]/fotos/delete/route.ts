import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import fs from "node:fs/promises";
import path from "node:path";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ albumId: string }> }
) {
  try {
    const { albumId } = await context.params;
    const albumIdNum = Number(albumId);

    if (!albumId || Number.isNaN(albumIdNum)) {
      return NextResponse.json(
        { error: "ID de álbum inválido" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const imageIdRaw = (formData.get("imageId") ?? "").toString().trim();
    const imageId = Number(imageIdRaw);

    if (!imageIdRaw || Number.isNaN(imageId)) {
      return NextResponse.json(
        { error: "ID de imagen inválido" },
        { status: 400 }
      );
    }

    // Buscar la imagen para obtener la URL
    const image = await prisma.portfolioImage.findFirst({
      where: {
        id: imageId,
        albumId: albumIdNum,
      },
    });

    if (!image) {
      return NextResponse.redirect(
        new URL(`/admin/portafolio/${albumIdNum}/fotos`, req.url)
      );
    }

    // Intentar borrar el archivo físico
    if (image.url.startsWith("/uploads/portfolio/")) {
      const filePath = path.join(process.cwd(), "public", image.url);
      try {
        await fs.unlink(filePath);
      } catch {
        // Si no existe el archivo, no rompemos nada
      }
    }

    // Borrar el registro en la base de datos
    await prisma.portfolioImage.delete({
      where: { id: imageId },
    });

    // Revalidar rutas
    revalidatePath(`/admin/portafolio/${albumIdNum}/fotos`);
    revalidatePath("/portafolio");

    return NextResponse.redirect(
      new URL(`/admin/portafolio/${albumIdNum}/fotos`, req.url)
    );
  } catch (err) {
    console.error("Error eliminando imagen de portafolio:", err);
    return NextResponse.json(
      { error: "Error al eliminar imagen" },
      { status: 500 }
    );
  }
}
