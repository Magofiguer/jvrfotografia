import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const packageIdRaw = (formData.get("packageId") ?? "").toString().trim();
    const packageId = Number(packageIdRaw);

    if (!packageIdRaw || Number.isNaN(packageId)) {
      return NextResponse.json(
        { error: "ID de paquete inválido" },
        { status: 400 }
      );
    }

    // Verificamos que exista
    const pkg = await prisma.package.findUnique({
      where: { id: packageId },
    });

    if (!pkg) {
      return NextResponse.redirect(new URL("/admin/paquetes", req.url));
    }

    // Si algún día este paquete tiene relaciones (ej: reservas), aquí habría que revisar antes de borrar
    await prisma.package.delete({
      where: { id: packageId },
    });

    revalidatePath("/admin/paquetes");
    revalidatePath("/paquetes");

    return NextResponse.redirect(new URL("/admin/paquetes", req.url));
  } catch (err) {
    console.error("Error eliminando paquete:", err);
    return NextResponse.json(
      { error: "Error al eliminar paquete" },
      { status: 500 }
    );
  }
}
    