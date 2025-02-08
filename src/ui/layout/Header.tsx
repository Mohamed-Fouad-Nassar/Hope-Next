import Link from "next/link";
import { cookies } from "next/headers";

import Logo from "./Logo";
import NavBar from "./NavBar";

import { verifyToken } from "@/utils/jwt";
import { getUserById } from "@/services/authAPI";

export const dynamic = "force-dynamic";

export default async function Header() {
  const userToken = cookies().get("jwtToken")?.value || "";
  const user = await verifyToken(userToken);

  const userFullData = user
    ? await getUserById(user?.id, userToken)
    : undefined;

  return (
    <header className="bg-white w-full fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <span className="sr-only">Hope Logo</span>
            <Logo />
          </Link>
        </div>

        <NavBar user={userFullData} />
      </div>
    </header>
  );
}
