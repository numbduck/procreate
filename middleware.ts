import { withAuth } from "next-auth/middleware";


export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ token, req }) => {
      // Restrict dashboard access to non-"user" roles
      if (req.nextUrl.pathname.startsWith("/dashboard") && token?.role === "user") {
        return false;
      }
      return true;
    },
  },
  // You can optionally expose token fields to use later in the app
  secret: process.env.NEXTAUTH_SECRET,
});

export const config = {
  matcher: ["/dashboard", "/products"],
};