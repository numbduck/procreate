import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  if (session?.user?.role === "admin") {
    return redirect("/dashboard");
  }

  return redirect("/products");
}