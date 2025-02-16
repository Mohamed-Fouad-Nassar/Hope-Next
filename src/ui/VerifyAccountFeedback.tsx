import Alert from "./Alert";
import Button from "./Button";

import { BASE_URL } from "@/lib/constants";

export default async function VerifyAccountFeedback({
  code,
}: {
  code: string;
}) {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!code) return <Alert status="failed">No code provided</Alert>;

  const res = await fetch(`${BASE_URL}/api/auth/verify-account`, {
    method: "POST",
    body: JSON.stringify({ code }),
  });

  if (!res.ok) return <Alert status="failed">Invalid Verification Code</Alert>;

  return (
    <>
      <Alert status="success">Your Account Verified Successfully</Alert>
      <Button as="Link" className="block w-fit mx-auto mt-4" href="/login">
        Login Now
      </Button>
    </>
  );
}
