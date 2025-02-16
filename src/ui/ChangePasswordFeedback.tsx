import Alert from "./Alert";
import ChangePasswordForm from "./ChangePasswordForm";

import { BASE_URL } from "@/lib/constants";

export default async function ChangePasswordFeedback({
  token,
}: {
  token: string;
}) {
  if (!token) return <Alert status="failed">No token provided</Alert>;

  const res = await fetch(`${BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({ token }),
  });
  if (!res.ok)
    return (
      <Alert status="failed">
        Invalid Token Provided, Try to request another one
      </Alert>
    );

  return <ChangePasswordForm token={token} />;
}
