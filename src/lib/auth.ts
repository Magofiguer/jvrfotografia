import bcrypt from "bcryptjs";

function readAdminHash(): string {
  const b64 = process.env.ADMIN_PASSWORD_HASH_B64;
  if (!b64) {
    throw new Error("ADMIN_PASSWORD_HASH_B64 no está definido en .env");
  }

  try {
    const decoded = Buffer.from(b64, "base64").toString("utf8").trim();
    if (!decoded.startsWith("$2")) {
      throw new Error("El hash decodificado no parece un hash bcrypt válido");
    }
    return decoded;
  } catch (err) {
    console.error("[AUTH] Error decodificando ADMIN_PASSWORD_HASH_B64", err);
    throw err;
  }
}

export async function validateAdminCredentials(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL no está definido en .env");
  }

  if (email !== adminEmail) return null;

  const hash = readAdminHash();
  const isValid = await bcrypt.compare(password, hash);
  if (!isValid) return null;

  return {
    email: adminEmail,
    role: "ADMIN" as const,
  };
}

