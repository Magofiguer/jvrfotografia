import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

// GET opcional para debug
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ albumId: string }> }
) {
  const { albumId } = await context.params;

  return NextResponse.json({
    ok: true,
    method: "GET",
    albumId,
  });
}

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

    // Filtramos solo los File válidos, sin usar any
    const rawFiles = formData.getAll("images");
    const files = rawFiles.filter((f): f is File => f instanceof File);

    const altBase = (formData.get("altBase") ?? "").toString().trim();

    if (!files.length) {
      return NextResponse.redirect(
        new URL(`/admin/portafolio/${albumIdNum}/fotos`, req.url)
      );
    }

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "portfolio",
      String(albumIdNum)
    );
    await fs.mkdir(uploadDir, { recursive: true });

    const existingCount = await prisma.portfolioImage.count({
      where: { albumId: albumIdNum },
    });
    let order = existingCount;

    for (const file of files) {
      if (file.size === 0) continue;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      let ext = "jpg";
      const type = file.type || "image/jpeg";

      if (type === "image/png") ext = "png";
      if (type === "image/webp") ext = "webp";

      const filename = `${Date.now()}-${randomUUID()}.${ext}`;
      const filepath = path.join(uploadDir, filename);

      await fs.writeFile(filepath, buffer);

      const relativeUrl = `/uploads/portfolio/${albumIdNum}/${filename}`;

      await prisma.portfolioImage.create({
        data: {
          albumId: albumIdNum,
          url: relativeUrl,
          alt: altBase || null,
          order,
        },
      });

      order++;
    }

    revalidatePath(`/admin/portafolio/${albumIdNum}/fotos`);
    revalidatePath("/portafolio");

    return NextResponse.redirect(
      new URL(`/admin/portafolio/${albumIdNum}/fotos`, req.url)
    );
  } catch (err) {
    console.error("Error subiendo imágenes de portafolio:", err);
    return NextResponse.json(
      { error: "Error al subir imágenes" },
      { status: 500 }
    );
  }
}
