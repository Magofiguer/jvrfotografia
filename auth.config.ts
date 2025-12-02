import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { validateAdminCredentials } from "@/lib/auth";

const authConfig = {
  providers: [
    Credentials({
      name: "Admin",
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          console.log("[AUTH] Faltan credenciales");
          return null;
        }

        const admin = await validateAdminCredentials(email, password);

        if (!admin) {
          console.log("[AUTH] Credenciales no válidas");
          return null;
        }

        console.log("[AUTH] Login correcto", admin.email);

        return {
          id: "admin",
          email: admin.email,
          role: admin.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/jvr-admin-portal-9c2f0a93/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && "role" in user) {
        const u = user as { role?: string | null };
        (token as { role?: string }).role = u.role ?? "ADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const t = token as { role?: string };
        (session.user as { role?: string }).role = t.role ?? "ADMIN";
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;

export default authConfig;
